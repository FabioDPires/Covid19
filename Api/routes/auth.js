var express = require("express");
var router = express.Router();
var authController = require("../controllers/authController");
var userController = require("../controllers/userController");

router.post("/login", authController.login);

router.post("/register", authController.registerUser);

router.post("/register/admin", authController.registerAdmin);

router.post(
  "/register/technical",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  authController.registerTechnical
);

router.get("/logout", authController.logout);

router.get("/profile", authController.verifyToken, authController.profile);

router.get(
  "/allusers",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.getAllUsers
);
module.exports = router;
