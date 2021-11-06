const express = require("express");

const usersController = require("../controllers/users_controller");

const usersRouter = express.Router();

usersRouter.get("/me", usersController.getUserByUserId);
usersRouter.patch("/me", usersController.updateUserInfoByUserId);

module.exports = usersRouter;
