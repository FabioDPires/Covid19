var User = require("../models/user");
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
    res.status(200).send({ auth: true, token: token });
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
          return res.status(500).json(err);
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
module.exports = authController;
