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

//Creates an user
userController.createUser = function (req, res, next) {
  var user = new User({
    cartaoCidadao: req.body.cartaoCidadao,
    password: req.body.password,
    role: "User",
    estado: "Suspeito",
  });

  user.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

//Lists all users(admins and technicals included)
userController.getAllUsers = function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      next(err);
    } else {
      res.json(users);
    }
  });
};

userController.getUserById = function (req, res, next, id) {
  User.findOne({ _id: id }, function (err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

userController.getOneUser = function (req, res) {
  res.json({
    cartaoCidadao: req.user.cartaoCidadao,
    historico: req.user.historico,
    estado: req.user.estado,
  });
};

// so admin e proprio user
userController.deleteUser = function (req, res, next) {
  req.user.remove(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(req.user);
    }
  });
};

userController.updateUserPassword = async (req, res) => {
  try {
    const oldUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        password: req.body.password,
      },
      {
        runValidators: true,
      }
    );

    const newUser = await User.findById(req.params.userId);
    res.send({
      old: oldUser,
      new: newUser,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Something went wrong");
  }
};

userController.updateUserState = async (req, res) => {
  const oldUser = await User.findByIdAndUpdate(req.params.userId, {
    estado: req.body.estado,
  });

  //so pode ter os valores permitidos
  const newUser = await User.findById(req.params.userId);
  res.send({
    old: oldUser,
    new: newUser,
  });
};

module.exports = userController;
