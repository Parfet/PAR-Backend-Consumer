const express = require("express");
const tokenAuthen = require("../middlewares/auth/index");
const firebaseAuthen = require("../middlewares/auth/external/firebase_auth/index");
const authController = require("../controllers/auth_controller");

const authRouter = express.Router();

authRouter.post("/token", tokenAuthen.requestToken);
authRouter.post("/refresh", tokenAuthen.refreshToken);

authRouter.post("/sign-in", authController.signInWithFirebase);
authRouter.get(
  "/check",
  firebaseAuthen.verifyAccessToken,
  authController.checkIsUserExisted
);

module.exports = authRouter;
