require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const handleErrors = require("./middlewares/handle_errors");
const { verifyToken } = require("./middlewares/auth/jwt");

const usersRouter = require("./routers/users_router");
const partiesRouter = require("./routers/parties_router");
const restaurantsRouter = require("./routers/restaurants_router");
const authRouter = require('./routers/auth_router')

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", authRouter)
app.use("/user", usersRouter);
app.use("/party", verifyToken, partiesRouter);
app.use("/restaurant", verifyToken, restaurantsRouter);

app.use(handleErrors);

app.listen(process.env.APP_PORT, () => {
  console.log(`Run on http://localhost:${process.env.APP_PORT}`);
});
