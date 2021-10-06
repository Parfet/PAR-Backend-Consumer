const express = require("express");

const restaurantsController = require("../controllers/restaurants_controller");

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", restaurantsController.findAllRestaurant);
restaurantsRouter.get("/:restaurant_id/info", restaurantsController.findRestaurantByRestaurantId)
restaurantsRouter.get("/:restaurant_id/promotions", restaurantsController.findPromotionByRestaurantId)
module.exports = restaurantsRouter;
