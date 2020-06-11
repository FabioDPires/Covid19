var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var authController = require("../controllers/authController");
var requestController = require("../controllers/requestController");

router.get(
  "/infectedPerSex",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.infectedPerSex
);

router.get(
  "/infectedPerAge",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.infectedPerAge
);

router.get(
  "/averageTestsPerUser",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  requestController.getAverageRequestsPerUser
);

router.get(
  "/results",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  requestController.percentageOfResults
);

router.get(
  "/states",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  requestController.percentageOfState
);

router.get(
  "/usersHealth",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.percentageHealth
);

router.get(
  "/requestsPerMonth",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  requestController.requestsPerMonth
);
module.exports = router;
