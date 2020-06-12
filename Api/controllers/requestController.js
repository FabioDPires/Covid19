var mongoose = require("mongoose");
var Request = require("../models/request");
var User = require("../models/user");

var requestController = {};

//Sets the date for an exam and changes the request state to scheduled
//used in auth
requestController.scheduleExam = async (req, res) => {
  if (new Date(req.body.dataExame) <= new Date() || !req.body.dataExame) {
    res.status(400).send("A data do exame tem de ser superior à data de hoje");
  } else {
    const checkScheduled = await Request.findById(req.params.requestId);
    if (
      checkScheduled.estadoPedido === "Concluído" ||
      checkScheduled.estadoPedido === "Agendado"
    ) {
      res
        .status(400)
        .send("Não pode agendar um teste já agendado ou concluído");
    } else {
      try {
        let date = new Date(req.body.dataExame);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let formatedDate = "";
        formatedDate += day + "/" + month + "/" + year;
        console.log("DATE:", formatedDate);
        const oldRequest = await Request.findByIdAndUpdate(
          req.params.requestId,
          {
            dataExame: req.body.dataExame,
            estadoPedido: "Agendado",
            prioridade: (checkScheduled.prioridade / 20) * 10 - 50,
            mes: month,
            dataFormatada: formatedDate,
          },
          { runValidators: true }
        );
        const newRequest = await Request.findById(req.params.requestId);
        res.send({
          old: oldRequest,
          new: newRequest,
        });
      } catch (err) {
        console.log("Erro: ", err);
        res.status(500).send("Algo correu mal");
      }
    }
  }
};
//Sets the result of the Covid exam and changes the state to finished

//used in auth
requestController.setExameResult = async (req, res) => {
  const checkScheduled = await Request.findById(req.params.requestId);
  if (checkScheduled.dataExame === undefined) {
    res
      .status(400)
      .send("Não pode inserir o resultado de um exame por agendar");
  } else if (checkScheduled.estadoPedido === "Concluído") {
    res
      .status(400)
      .send("Não pode alterar o resultado de um exame já concluído");
  } else if (new Date(Date.now()) < checkScheduled.dataExame) {
    res
      .status(400)
      .send(
        "Não pode inserir o resultado de um exame que ainda não se realizou"
      );
  } else if (!req.body.resultado) {
    res.status(400).send("Indique o resultado");
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
        console.log("Resultado Negativo");
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
                var newDate = new Date(Date.now() + 172800000);

                let month = newDate.getMonth() + 1;
                let day = newDate.getDate();
                let year = newDate.getFullYear();
                let formatedDate = "";
                formatedDate += day + "/" + month + "/" + year;

                var request = new Request({
                  paciente: newRequest.paciente,
                  encaminhado: newRequest.encaminhado,
                  pessoaRisco: newRequest.pessoaRisco,
                  trabalhoRisco: newRequest.trabalhoRisco,
                  estadoPedido: "Agendado",
                  dataExame: newDate,
                  mes: month,
                  dataFormatada: formatedDate,
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
      console.log("Erro: ", err);
      res.status(500).send(err);
    }
  }
};

requestController.getRequestById = function (req, res, next, id) {
  const filter = {};
  if (req.role === "User") {
    filter.paciente = req.userId;
  }
  Request.findOne({ ...filter, _id: id }).exec(function (err, request) {
    if (err) {
      next(err);
    } else {
      req.request = request;
      next();
    }
  });
};

//used in auth
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

//used in auth
requestController.getOneRequest = function (req, res) {
  Request.findOne({ _id: req.params.requestId })
    .populate("paciente", "cartaoCidadao estado sexo idade")
    .exec(function (err, request) {
      if (err) {
        next(err);
      } else {
        res.json(request);
      }
    });
};

//used in auth
requestController.getUserRequests = function (req, res) {
  Request.find({ paciente: req.params.userId }).exec(function (err, requests) {
    if (err) {
      next(err);
    } else {
      requests.reverse();
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

//used in auth
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
          res.json({
            users: countUsers,
            requests: countRequests,
            average: average,
          });
        }
      });
    }
  });
};

requestController.percentageOfResults = function (req, res, next) {
  Request.aggregate(
    [
      { $match: { estadoPedido: "Concluído" } },
      { $group: { _id: "$resultado", count: { $sum: 1 } } },
    ],
    function (err, count) {
      if (err) {
        next(err);
      } else {
        res.json(count);
      }
    }
  );
};

requestController.percentageOfState = function (req, res, next) {
  Request.aggregate(
    [{ $group: { _id: "$estadoPedido", count: { $sum: 1 } } }],
    function (err, count) {
      if (err) {
        next(err);
      } else {
        res.json(count);
      }
    }
  );
};

requestController.requestsPerMonth = function (req, res, next) {
  Request.aggregate(
    [
      {
        $match: {
          dataExame: { $lte: new Date() },
          estadoPedido: { $in: ["Concluído", "Agendado"] },
        },
      },
      { $group: { _id: "$mes", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ],
    function (err, count) {
      if (err) {
        next(err);
      } else {
        res.json(count);
      }
    }
  );
};

module.exports = requestController;
