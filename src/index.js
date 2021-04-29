require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const handleErrors = require("./middlewares/handle_errors");

const usersRouter = require("./routers/users_router");
const partiesRouter = require("./routers/parties_router");
const restaurantsRouter = require("./routers/restaurants_router");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", usersRouter);
app.use("/party", partiesRouter);
app.use("/restaurant", restaurantsRouter);

app.use(handleErrors);

app.listen(process.env.APP_PORT, () => {
  console.log(`Run on http://localhost:${process.env.APP_PORT}`);
});
