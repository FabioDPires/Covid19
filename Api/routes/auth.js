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
  "/allUsers",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.getAllUsers
);

router.get(
  "/userProfile/:userId",
  authController.verifyToken,
  authController.verifyRoleAdmin_Me,
  authController.userProfile
);

router.delete(
  "/user/:userId",
  authController.verifyToken,
  authController.verifyRoleAdmin_Me,
  userController.deleteUser
);

router.put(
  "/user/:userId/updatePassword",
  authController.verifyToken,
  authController.me,
  authController.updatePassword
);

router.get(
  "/user/:userId/history",
  authController.verifyToken,
  authController.verifyRoleAdmin_Technical_Me,
  requestController.getUserRequests
);

router.get(
  "/user/:userId/numberOfTests",
  authController.verifyToken,
  authController.verifyRoleAdmin_Technical_Me,
  requestController.getNumberOfUserTests
);

router.get(
  "/stats/infectedUsers",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.infected
);

router.get(
  "/stats/averageTestsPerUser",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  requestController.getAverageRequestsPerUser
);

router.get(
  "/stats/finishedTests",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  requestController.finishedTests
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
  "/request/:requestId",
  authController.verifyToken,
  authController.verifyRoleTechnical,
  requestController.getOneRequest
);

router.put(
  "/request/:requestId/schedule",
  authController.verifyToken,
  authController.verifyRoleTechnical,
  requestController.scheduleExam
);

router.put(
  "/request/:requestId/setResult",
  authController.verifyToken,
  authController.verifyRoleTechnical,
  requestController.setExameResult
);

router.param("userId", userController.getUserById);

module.exports = router;
