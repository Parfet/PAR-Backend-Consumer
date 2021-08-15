const express = require('express')

const usersController = require('../controllers/users_controller');

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAllUser);
usersRouter.get('/me/:user_id', usersController.getUserByUserId)

module.exports = usersRouter;