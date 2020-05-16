var express = require("express");
var router = express.Router();
var requestController = require("../controllers/requestController");

router.get("/requests", requestController.getAllRequests);
//Creates an request
router.post("/requests", requestController.createRequest);

router.put("/request/:requestId/schedule", requestController.scheduleExam);

router.put("/request/:requestId/setResult", requestController.setExameResult);

router.get("/request/:requestId", requestController.getOneRequest);

router.get("/requests/average", requestController.getAverageRequestsPerUser);

//router.get("/requests/:date", requestController.getTestsOfDay);

//All the paths with the parameter requestId
router.param("requestId", requestController.getRequestById);

module.exports = router;
