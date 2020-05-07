var mongoose = require("mongoose");
var User = require("../models/user");

var userController = {};

//Creates an administrator
userController.createAdmin = function (req, res, next) {
  var user = new User({
    cartaoCidadao: req.body.cartaoCidadao,
    password: req.body.password,
    role: "Admin",
  });

  user.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

//Creates a technical(person who is going to agend the covid exams)
userController.createTechnical = function (req, res, next) {
  var user = new User({
    cartaoCidadao: req.body.cartaoCidadao,
    password: req.body.password,
    role: "Technical",
  });

  user.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

userController.createUser = function (req, res, next) {
  var user = new User({
    cartaoCidadao: req.body.cartaoCidadao,
    password: req.body.password,
    role: "User",
  });

  user.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

module.exports = userController;
