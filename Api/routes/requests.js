var express = require("express");
var router = express.Router();
var requestController = require("../controllers/requestController");
var authController = require("../controllers/authController");
const path = require("path");
const multer = require("multer");
const upload = multer({
  dest: path.resolve("public", "pdfs"),
});

router.get(
  "/requests",
  authController.verifyToken,
  authController.verifyRoleTechnical,
  requestController.getAllRequests
);

router.post(
  "/requests",
  authController.verifyToken,
  authController.createRequest
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
  upload.single("pdf"),
  requestController.setExameResult
);

module.exports = router;
