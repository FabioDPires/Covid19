var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

//List all users
//router.get("/users", userController.getUsers);
//Create an user
router.post("/users", userController.createUser);
//List an user by his Id
//router.get("/user/:userId", userController.getOneUser);
//Edit an user by his Id
//router.put("/user/:userId", userController.updateUser);
//Delete  an user by his Id
//router.delete("/user/:userId", userController.deleteUser);

//All the paths with the parameter userId
//router.param("userId", userController.getUserById);

module.exports = router;
