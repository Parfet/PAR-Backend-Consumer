require("dotenv").config();
const restaurantService = require("../services/restaurants_service");
const checkErrorService = require("../utils/check_error");
const { RESTAURANT_AVAILABLE } = require("../constants/enum");
const { Op } = require("sequelize");
const axios = require("axios");
module.exports = {
  // @params: lat
  // @params: lng
  // @params: keyword
  findAllRestaurant: async (req, res) => {
    try {
      let status = "";
      if (req.query.status) {
        if (
          checkErrorService.checkMatchEnum(
            "RESTAURANT_AVAILABLE",
            req.query.status
          )
        ) {
          status = req.query.status;
        } else {
          return res.status(400).json({
            message: "Invalid Status",
          });
        }
      }

      const { lat, lng, keyword } = req.query;
      let params = {
        key: process.env.GOOGLE_MAP_API_KEY,
        location: `${lat},${lng}`,
        radius: 1500,
        type: "restaurant",
        keyword: keyword,
      };
      let response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        { params }
      );
      let restaurants = response.data.results;
      console.log(restaurants, "restaurants");
      // if (status === RESTAURANT_AVAILABLE.OPEN) {
      //   restaurants = restaurants.filter(
      //     (e) => e.opening_hours && e.opening_hours.open_now
      //   );
      // } else if (status === RESTAURANT_AVAILABLE.CLOSED) {
      //   restaurants = restaurants.filter(
      //     (e) => !e.opening_hours.open_now && e.opening_hours
      //   );
      // }
      if (restaurants.length > 0) {
        return res.status(200).json({
          restaurants: restaurants,
        });
      } else {
        return res.status(204).json();
      }
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },
  findRestaurantByRestaurantId: async (req, res) => {
    try {
      const restaurant = await restaurantService.findAllRestaurant({
        query: {
          restaurant_id: req.params.restaurant_id,
        },
      });
      if (restaurant.length === 0) {
        return res.status(204).json();
      }
      return res.status(200).json({
        restaurant: restaurant[0],
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },
  findPromotionByRestaurantId: async (req, res) => {
    try {
      const restaurant = await restaurantService.findAllRestaurant({
        query: {
          restaurant_id: req.params.restaurant_id,
        },
      });
      if (restaurant.length === 0) {
        return res.status(204).json();
      }
      if (restaurant[0].promotions.length === 0) {
        return res.status(204).json();
      }
      return res.status(200).json({
        promotions: restaurant[0].promotions,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },
};
