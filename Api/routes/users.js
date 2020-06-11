var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var requestController = require("../controllers/requestController");
var authController = require("../controllers/authController");

//Lists all users
//router.get("/users", userController.getAllUsers); //->usado no auth
//Creates an admin
//router.post("/users/admin", userController.createAdmin);
//Creates a technical
//router.post("/users/technical", userController.createTechnical);
//Creates an user
//router.post("/users", userController.createUser);

//Lists an user by his Id
//router.get("/user/:userId", userController.getOneUser);
//Updates an user´s password
//router.put("/user/:userId/password", userController.updateUserPassword);

//Deletes  an user by his Id
router.delete("/user/:userId", userController.deleteUser);

//router.get("/user/:userId/history", requestController.getUserRequests);

//router.get("/users/infected", userController.infected);

router.get(
  "/user/:userId/numberOfTests",
  requestController.getNumberOfUserTests
);

router.get(
  "/users",
  authController.verifyToken,
  authController.verifyRoleAdmin,
  userController.getAllUsers
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
