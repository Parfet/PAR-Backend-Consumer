require("dotenv").config();
const restaurantService = require("../services/restaurants_service");
const checkErrorService = require("../utils/helper");
const { RESTAURANT_AVAILABLE } = require("../constants/enum");
const { Op } = require("sequelize");
const axios = require("axios");
module.exports = {
  // @params: lat
  // @params: lng
  // @params: keyword
  findAllRestaurant: async (req, res) => {
    try {
      const { lat, lng, keyword } = req.query;

      let response;
      if (lat && lng) {
        const params = {
          key: process.env.GOOGLE_MAP_API_KEY,
          location: `${lat},${lng}`,
          radius: 1500,
          type: "restaurant",
          keyword: keyword,
        };
        response = await axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
          { params }
        );
      } else {
        const params = {
          key: process.env.GOOGLE_MAP_API_KEY,
          query: keyword,
        };
        response = await axios.get(
          "https://maps.googleapis.com/maps/api/place/textsearch/json",
          { params }
        );
      }
      if (!response) {
        return res.status(500).json({
          message: "external server error",
        });
      }

      let restaurants = response.data.results;
      for (const restaurant of restaurants) {
        const params = {
          key: process.env.GOOGLE_MAP_API_KEY,
          place_id: restaurant.place_id,
          fields: "url",
        };
        let _response = await axios.get(
          "https://maps.googleapis.com/maps/api/place/details/json",
          {
            params,
          }
        );
        restaurant.map_url = _response.data.result.url;
      }
      // TODO: imeplement restaurant filter
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
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },
  findRestaurantByName: async (req, res) => {
    try {
      if (!req.params.restaurant_name) {
        return res.status(400).json({
          message: "restaurant name invalid",
        });
      }
      return res.status(204).json();
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },
  findRestaurantByRestaurantId: async (req, res) => {
    try {
      const restaurant = await restaurantService.findRestaurantByRestaurantId({
        restaurant_id: req.params.restaurant_id,
      });
      if (restaurant === "") {
        return res.status(204).json();
      }
      return res.status(200).json({
        restaurant: restaurant,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },
};
