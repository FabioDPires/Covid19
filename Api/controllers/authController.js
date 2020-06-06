var User = require("../models/user");
var Request = require("../models/request");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var bcrypt = require("bcryptjs");
var config = require("../authconfig"); // get config file

var authController = {};

authController.login = function (req, res) {
  User.findOne({ cartaoCidadao: req.body.cartaoCidadao }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });
    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    // return the information including token as JSON
    res
      .status(200)
      .send({ auth: true, token: token, role: user.role, id: user._id });
  });
};

authController.logout = function (req, res) {
  res.status(200).send({ auth: false, token: null });
};

authController.registerUser = function (req, res) {
  if (!req.body.password || req.body.password.length < 8) {
    res
      .status(400)
      .json({ message: "The password must be at least 8 characters long" });
  } else {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create(
      {
        cartaoCidadao: req.body.cartaoCidadao,
        password: hashedPassword,
        estado: "Suspeito",
        role: "User",
      },
      function (err, user) {
        if (err)
          return res
            .status(500)
            .send("There was a problem registering the user`.");
        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      }
    );
  }
};

authController.registerAdmin = function (req, res) {
  if (!req.body.password || req.body.password.length < 8) {
    res
      .status(400)
      .json({ message: "The password must be at least 8 characters long" });
  } else {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create(
      {
        cartaoCidadao: req.body.cartaoCidadao,
        password: hashedPassword,
        estado: "Suspeito",
        role: "Admin",
      },
      function (err, user) {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: err.errmsg });
        }
        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      }
    );
  }
};

authController.registerTechnical = function (req, res) {
  if (!req.body.password || req.body.password.length < 8) {
    res
      .status(400)
      .json({ message: "The password must be at least 8 characters long" });
  } else {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create(
      {
        cartaoCidadao: req.body.cartaoCidadao,
        password: hashedPassword,
        estado: "Suspeito",
        role: "Technical",
      },
      function (err, user) {
        if (err) return res.status(400).send({ message: err.message });
        // if user is registered without errors
        // create a token

        var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(201).send({ auth: true, token: token });
      }
    );
  }
};

authController.createRequest = function (req, res) {
  Request.countDocuments(
    {
      estadoPedido: { $in: ["Pendente", "Agendado"] },
      paciente: req.userId,
    },
    async function (err, count) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        if (count > 0) {
          res.status(400).send("This user still has unfinished requests");
        } else {
          const userId = req.userId;
          const user = await User.findById({ _id: userId });
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
            paciente: userId,
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

//middleware
authController.verifyToken = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  console.log(token);
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

authController.verifyRoleAdmin = function (req, res, next) {
  User.findById(req.userId, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    if (user.role === "Admin") {
      next();
    } else {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }
  });
};

authController.verifyRoleTechnical = function (req, res, next) {
  User.findById(req.userId, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    if (user.role === "Technical") {
      next();
    } else {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }
  });
};

authController.verifyRoleAdmin_Technical_Me = function (req, res, next) {
  User.findById(req.userId, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    console.log("ID DA SESSAO:", req.userId);
    console.log("ID DO UTILIZADOR:", req.params.userId);
    if (
      user.role === "Technical" ||
      user.role === "Admin" ||
      user._id == req.params.userId
    ) {
      next();
    } else {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }
  });
};

authController.verifyRoleAdmin_Me = function (req, res, next) {
  User.findById(req.userId, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    console.log("ID DA SESSAO:", req.userId);
    console.log("ID DO UTILIZADOR:", req.params.userId);
    console.log(req.userId === req.params.userId);
    if (user.role === "Admin" || user._id == req.params.userId) {
      next();
    } else {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }
  });
};

authController.me = function (req, res, next) {
  User.findById(req.userId, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    console.log("ID DA SESSAO:", req.userId);
    console.log("ID DO UTILIZADOR:", req.params.userId);
    console.log(req.userId === req.params.userId);
    if (user._id == req.params.userId) {
      next();
    } else {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }
  });
};

authController.profile = function (req, res, next) {
  User.findById(req.userId, function (err, user) {
    if (err) {
      console.log("Error: ", err);
      res.json(err);
    } else {
      res.json(user);
    }
  });
};

authController.userProfile = function (req, res) {
  User.findOne({ _id: req.params.userId }).exec(function (err, user) {
    if (err) {
      return res.status(500).send("There was a problem finding the user");
    }
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user) {
      res.json(user);
    }
  });
};

authController.updatePassword = async function (req, res) {
  if (!req.body.password || req.body.password.length < 8) {
    res
      .status(400)
      .json({ message: "The password must be at least 8 characters long" });
  }
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  try {
    const oldUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        password: hashedPassword,
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
module.exports = authController;
