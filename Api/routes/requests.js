var express = require("express");
var router = express.Router();
var requestController = require("../controllers/requestController");
var authController = require("../controllers/authController");

router.get(
  "/requests",
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

module.exports = router;
