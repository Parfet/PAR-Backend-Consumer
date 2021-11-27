require("dotenv").config();
const express = require("express");
const cors = require("cors");
const moment =require('moment')

const handleErrors = require("./middlewares/handle_errors");
const firebaseAuthen = require("./middlewares/auth/external/firebase_auth");

const usersRouter = require("./routers/users_router");
const partiesRouter = require("./routers/parties_router");
const restaurantsRouter = require("./routers/restaurants_router");
const authRouter = require("./routers/auth_router");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  "/auth",
  firebaseAuthen.verifyAccessToken,
  (req, res, next) => {
    console.log("==========> ", moment().format(), " <=========");
    console.log("user: ", req.user);
    console.log("method: ", req.method);
    console.log("url: ", req.originalUrl);
    console.log("param: ", req.params);
    console.log("query: ", req.query);
    console.log("body: ", req.body);
    next();
  },
  authRouter
);
app.use(
  "/user",
  firebaseAuthen.verifyAccessToken,
  (req, res, next) => {
    console.log("==========> ", moment().format(), " <=========");
    console.log("user: ", req.user);
    console.log("method: ", req.method);
    console.log("url: ", req.originalUrl);
    console.log("param: ", req.params);
    console.log("query: ", req.query);
    console.log("body: ", req.body);
    next();
  },
  usersRouter
);
app.use(
  "/party",
  firebaseAuthen.verifyAccessToken,
  (req, res, next) => {
    console.log("==========> ", moment().format(), " <=========");
    console.log("user: ", req.user);
    console.log("method: ", req.method);
    console.log("url: ", req.originalUrl);
    console.log("param: ", req.params);
    console.log("query: ", req.query);
    console.log("body: ", req.body);
    next();
  },
  partiesRouter
);
app.use(
  "/restaurant",
  firebaseAuthen.verifyAccessToken,
  (req, res, next) => {
    console.log("==========> ", moment().format(), " <=========");
    console.log("user: ", req.user);
    console.log("method: ", req.method);
    console.log("url: ", req.originalUrl);
    console.log("param: ", req.params);
    console.log("query: ", req.query);
    console.log("body: ", req.body);
    next();
  },
  restaurantsRouter
);

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
