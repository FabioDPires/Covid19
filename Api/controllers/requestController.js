var mongoose = require("mongoose");
var Request = require("../models/request");

var requestController = {};

requestController.getAllRequests = function (req, res, next) {
  Request.find()
    .populate("paciente")
    .exec(function (err, requests) {
      if (err) {
        next(err);
      } else {
        res.json(requests);
      }
    });
};

//Creates an request
requestController.createRequest = function (req, res, next) {
  var request = new Request({
    paciente: req.body.paciente,
    encaminhado: req.body.encaminhado,
    pessoaRisco: req.body.pessoaRisco,
    trabalhoRisco: req.body.trabalhoRisco,
    estadoPedido: "Pendente",
  });

  request.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(request);
    }
  });
};

//Sets the date for an exam and changes the request state to scheduled
requestController.scheduleExam = async (req, res) => {
  const oldRequest = await Request.findByIdAndUpdate(req.params.requestId, {
    dataExame: req.body.dataExame,
    estadoPedido: "Agendado",
  });

  const newRequest = await Request.findById(req.params.requestId);
  res.send({
    old: oldRequest,
    new: newRequest,
  });
};

//Sets the result of the Covid exam and changes the state to finished
requestController.setExameResult = async (req, res) => {
  try {
    const oldRequest = await Request.findByIdAndUpdate(req.params.requestId, {
      resultado: req.body.resultado,
      estadoPedido: "Concluído",
    },
    {
      runValidators=true
    }
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
};

requestController.getRequestById = function (req, res, next, id) {
  Request.findOne({ _id: id })
    .populate("paciente", " cartaoCidadao historico estado")
    .exec(function (err, request) {
      if (err) {
        next(err);
      } else {
        res.json(request);
      }
    });
};

requestController.getOneRequest = function (req, res) {
  res.json(req.body);
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

module.exports = requestController;
