// update =>alterar pedido (estado, resultado);

//GET=>ver pedido

var mongoose = require("mongoose");
var Request = require("../models/request");

var requestController = {};

//Creates an request
requestController.createRequest = function (req, res, next) {
  var request = new Request({
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
    const oldRequest = await Request.findByIdAndUpdate(req.params.requestId, {
      resultado: req.body.resultado,
      estadoPedido: "Concluído",
    });
  
    const newRequest = await Request.findById(req.params.requestId);
    res.send({
      old: oldRequest,
      new: newRequest,
    });
  };  


requestController.getRequestById = function (req, res, next, id) {
  Request.findOne({ _id: id }, function (err, request) {
    if (err) {
      next(err);
    } else {
      req.request = request;
      next();
    }
  });
};

module.exports = requestController;
