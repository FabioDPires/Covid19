var mongoose = require("mongoose");
var Request = require("../models/request");
var User = require("../models/user");

var requestController = {};

//Creates an request
requestController.createRequest = function (req, res, next) {
  Request.countDocuments(
    {
      estadoPedido: { $in: ["Pendente", "Agendado"] },
      paciente: req.body.paciente,
    },
    async function (err, count) {
      if (err) {
        next(err);
      } else {
        if (count > 0) {
          res.status(400).send("This user still has unfinished requests");
        } else {
          const user = await User.findById({ _id: req.body.paciente });
          var prioridade = 10;
          if (user.estado === "Infetado") {
            prioridade += 7;
          }
          if (req.body.pessoaRisco === true) {
            prioridade += 3;
          }
          if (req.body.trabalhoRisco === true) {
            prioridade += 2;
          }
          if (req.body.encaminhado === true) {
            prioridade += 2;
          }
          var request = new Request({
            paciente: req.body.paciente,
            encaminhado: req.body.encaminhado,
            pessoaRisco: req.body.pessoaRisco,
            trabalhoRisco: req.body.trabalhoRisco,
            estadoPedido: "Pendente",
            prioridade: prioridade * 20,
          });
          request.save(function (err) {
            if (err) {
              next(err);
            } else {
              res.json(request);
            }
          });
        }
      }
    }
  );
};
//Sets the date for an exam and changes the request state to scheduled
requestController.scheduleExam = async (req, res) => {
  if (new Date(req.body.dataExame) <= new Date()) {
    res.status(400).send("dataExame must be greather than today´s date");
  } else {
    const checkScheduled = await Request.findById(req.params.requestId);
    if (checkScheduled.estadoPedido === "Concluído") {
      res.status(400).send("You can´t schedule an already finished exame");
    } else {
      try {
        const oldRequest = await Request.findByIdAndUpdate(
          req.params.requestId,
          {
            dataExame: req.body.dataExame,
            estadoPedido: "Agendado",
            prioridade: (checkScheduled.prioridade / 20) * 10 - 50,
          },
          { runValidators: true }
        );
        const newRequest = await Request.findById(req.params.requestId);
        res.send({
          old: oldRequest,
          new: newRequest,
        });
      } catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Something went wrong");
      }
    }
  }
};
//Sets the result of the Covid exam and changes the state to finished
requestController.setExameResult = async (req, res) => {
  const checkScheduled = await Request.findById(req.params.requestId);
  if (checkScheduled.dataExame === undefined) {
    res.status(400).send("You can´t set the result for an unscheduled exame");
  } else if (checkScheduled.estadoPedido === "Concluído") {
    res.status(400).send("You can´t change the result of a finished exame");
  } else {
    try {
      const oldRequest = await Request.findByIdAndUpdate(
        req.params.requestId,
        {
          resultado: req.body.resultado,
          estadoPedido: "Concluído",
          prioridade: 0,
        },
        {
          runValidators: true,
        }
      );

      const newRequest = await Request.findById(req.params.requestId);
      res.send({
        old: oldRequest,
        new: newRequest,
      });

      if (newRequest.resultado == "Positivo") {
        const newUser = await User.findByIdAndUpdate(
          { _id: newRequest.paciente },
          {
            estado: "Infetado",
          },
          {
            runValidators: true,
          }
        );
      } else {
        Request.find({ paciente: newRequest.paciente })
          .limit(2)
          .sort({ dataExame: -1 })
          .exec(async function (err, requests) {
            if (err) {
              next(err);
            } else {
              console.log("Tamanho Requests: ", requests.length);
              console.log("Resultado", requests[0]);
              if (requests.length > 1 && requests[1].resultado === "Negativo") {
                console.log("Exame atual:", requests[0]);
                console.log("Exame atual:", requests[1]);
                const newUser = await User.findByIdAndUpdate(
                  { _id: newRequest.paciente },
                  {
                    estado: "Não Infetado",
                  },
                  {
                    runValidators: true,
                  }
                );
              }
              if (requests.length < 2 || requests[1].resultado === "Positivo") {
                var newData = new Date();
                var request = new Request({
                  paciente: newRequest.paciente,
                  encaminhado: newRequest.encaminhado,
                  pessoaRisco: newRequest.pessoaRisco,
                  trabalhoRisco: newRequest.trabalhoRisco,
                  estadoPedido: "Agendado",
                  dataExame: newData.setDate(
                    newRequest.dataExame.getDate() + 2
                  ),
                  prioridade: oldRequest.prioridade,
                });
                request.save(function (err) {
                  if (err) {
                    next(err);
                  } else {
                    console.log("Novo Exame marcado");
                  }
                });
              }
            }
          });
      }
    } catch (err) {
      console.log("Error: ", err);
      res.status(500).send("Something went wrong");
    }
  }
};

requestController.getRequestById = function (req, res, next, id) {
  Request.findOne({ _id: id }).exec(function (err, request) {
    if (err) {
      next(err);
    } else {
      req.request = request;
      next();
    }
  });
};

requestController.getAllRequests = function (req, res, next) {
  Request.find()
    .sort({ prioridade: -1 })
    .populate("paciente", "cartaoCidadao estado")
    .exec(function (err, requests) {
      if (err) {
        next(err);
      } else {
        res.json(requests);
      }
    });
};

requestController.getOneRequest = function (req, res) {
  Request.findOne({ _id: req.params.requestId })
    .populate("paciente", "cartaoCidadao estado")
    .exec(function (err, request) {
      if (err) {
        next(err);
      } else {
        res.json(request);
      }
    });
};

requestController.getUserRequests = function (req, res) {
  Request.find({ paciente: req.params.userId }).exec(function (err, requests) {
    if (err) {
      next(err);
    } else {
      res.json(requests);
    }
  });
};

requestController.getNumberOfUserTests = function (req, res) {
  Request.countDocuments({ paciente: req.params.userId }, function (
    err,
    count
  ) {
    if (err) {
      next(err);
    } else {
      res.json(count);
    }
  });
};

requestController.getAverageRequestsPerUser = function (req, res, next) {
  Request.countDocuments(function (err, countRequests) {
    if (err) {
      next(err);
    } else {
      User.countDocuments(function (err, countUsers) {
        if (err) {
          next(err);
        } else {
          const average = countRequests / countUsers;
          res.json(average);
        }
      });
    }
  });
};



requestController.totalTests = function (req, res) {
  Request.countDocuments({ estadoPedido: "Concluído" }, function (err, count) {
    if (err) {
      next(err);
    } else {
      res.json(count);
    }
  });
};

module.exports = requestController;
