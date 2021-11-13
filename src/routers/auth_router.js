const express = require("express");

const authController = require("../controllers/auth_controller");

const authRouter = express.Router();

authRouter.get("/check", authController.checkIsUserExisted);
authRouter.post("/register", authController.register);

module.exports = authRouter;
