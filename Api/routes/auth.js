var express = require("express");
var router = express.Router();
var authController = require("../controllers/authController");
var userController = require("../controllers/userController");
var requestController = require("../controllers/requestController");

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.post("/register", authController.registerUser);

router.post(
  "/register/admin",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  authController.registerAdmin
);

router.post(
  "/register/technical",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  authController.registerTechnical
);

router.get(
  "/userProfile/:userId",
  authController.verifyToken,
  authController.verifyRoleAdmin_Me,
  authController.userProfile
);

router.put(
  "/user/:userId/updatePassword",
  authController.verifyToken,
  authController.me,
  authController.updatePassword
);

router.param("userId", userController.getUserById);

module.exports = router;
