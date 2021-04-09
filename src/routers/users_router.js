const express = require('express')

const usersController = require('../controllers/users_controller');

export const usersRouter = express.Router();

usersRouter.get("/", usersController.getUser);