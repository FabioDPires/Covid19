var express = require("express");
var router = express.Router();
var requestController = require("../controllers/requestController");

//Creates an request
router.post("/requests", requestController.createRequest);

router.put("/request/schedule/:requestId", requestController.scheduleExam);

router.put("/request/setResult/:requestId",requestController.setExameResult)

//All the paths with the parameter requestId
router.param("requestId", requestController.getRequestById);

module.exports = router;
