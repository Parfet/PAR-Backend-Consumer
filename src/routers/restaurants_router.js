const express = require("express");

const restaurantsController = require("../controllers/restaurants_controller");

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", restaurantsController.findAllRestaurant);

module.exports = restaurantsRouter;
