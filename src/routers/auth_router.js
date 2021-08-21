const express = require("express");
const tokenAuthen = require("../middlewares/auth/index");
const firebaseAuthen = require("../middlewares/auth/external/firebase_auth/index");
const authController = require("../controllers/auth_controller");

const authRouter = express.Router();

authRouter.post("/token", tokenAuthen.requestToken);
authRouter.post("/refresh", tokenAuthen.refreshToken);

authRouter.get(
  "/check",
  firebaseAuthen.verifyAccessToken,
  authController.checkIsUserExisted
);

authRouter.post(
  "/register",
  firebaseAuthen.verifyAccessToken,
  authController.register
);

module.exports = authRouter;
