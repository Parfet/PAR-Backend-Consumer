const express = require('express')

const usersController = require('../controllers/users_controller');

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAllUser);

module.exports = usersRouter;