require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const handleErrors = require("./middlewares/handle_errors");
const { verifyToken } = require("./middlewares/auth");
const firebaseAuthen = require("./middlewares/auth/external/firebase_auth");

const usersRouter = require("./routers/users_router");
const partiesRouter = require("./routers/parties_router");
const restaurantsRouter = require("./routers/restaurants_router");
const authRouter = require("./routers/auth_router");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", firebaseAuthen.verifyAccessToken, usersRouter);
app.use("/party", firebaseAuthen.verifyAccessToken, partiesRouter);
app.use("/restaurant", firebaseAuthen.verifyAccessToken, restaurantsRouter);

app.use(handleErrors);

if (process.env.NODE_ENV === "test") {
  app.listen(process.env.TEST_APP_PORT, () => {
    console.log(`Run on http://localhost:${process.env.TEST_APP_PORT}`);
  });
} else {
  app.listen(process.env.DEV_APP_PORT, () => {
    console.log(`Run on http://localhost:${process.env.DEV_APP_PORT}`);
  });
}

module.exports = app;
