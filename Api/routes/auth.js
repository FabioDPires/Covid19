var express = require("express");
var router = express.Router();
var authController = require("../controllers/authController");
var userController = require("../controllers/userController");
var requestController = require("../controllers/requestController");

router.post("/login", authController.login);

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

router.get("/logout", authController.logout);

router.get("/profile", authController.verifyToken, authController.profile);

router.get(
  "/allusers",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.getAllUsers
);

router.post(
  "/createRequest",
  authController.verifyToken,
  authController.createRequest
);

router.get(
  "/allRequests",
  authController.verifyToken,
  authController.verifyRoleTechnical,
  requestController.getAllRequests
);

router.get(
  "/userProfile/:userId",
  authController.verifyToken,
  authController.userProfile
);
module.exports = router;
