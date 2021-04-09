const express = require("express");
const expressWinston = require("express-winston");
const winston = require("winston");
const app = express();
const Sequelize = require('sequelize');
const moment = require('moment-timezone');

const sequelize = new Sequelize('parfet', 'dev', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: winston.info
})

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.use("/api", (_req, res, _next) => {
  res.json({
    message: "Hi This is API service.",
  });
});

app.use("/test", async (_req, res, _next) => {
    try{
        const response = await sequelize.authenticate();
        console.log(`Response: ${response}`)
        console.log(`Moment: ${moment(moment().toDate()).format()}`);
        res.json({
            response: "haha"
        })
    }catch (e) {
        console.log('Failed by', e)
    }
})

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.listen(3000, () => {
    console.log("Run on http://localhost:3000");
})