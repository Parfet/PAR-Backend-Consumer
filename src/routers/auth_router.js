const express = require("express");
const authRouter = express.Router();
const tokenAuthen = require("../middlewares/auth/jwt");

authRouter.post("/token", tokenAuthen.requestToken);
authRouter.post("/refresh", tokenAuthen.refreshToken);

module.exports = authRouter;