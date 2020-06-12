var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var requestController = require("../controllers/requestController");
var authController = require("../controllers/authController");

router.get(
  "/users",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.getAllUsers
);

router.delete(
  "/user/:userId",
  authController.verifyToken,
  authController.verifyRoleAdmin_Me,
  userController.deleteUser
);

router.get(
  "/user/:userId/numberOfTests",
  authController.verifyToken,
  authController.verifyRoleAdmin_Technical_Me,
  requestController.getNumberOfUserTests
);

router.get(
  "/user/:userId/history",
  authController.verifyToken,
  authController.verifyRoleAdmin_Technical_Me,
  requestController.getUserRequests
);

//All the paths with the parameter userId
router.param("userId", userController.getUserById);

module.exports = router;
