const restaurantService = require("../services/restaurants_service");
const checkErrorService = require("../utils/check_error");
const { Op } = require("sequelize");
module.exports = {
  findAllRestaurant: async (req, res) => {
    try {
      const query = {};
      if (req.query.status) {
        if (
          checkErrorService.checkMatchEnum(
            "RESTAURANT_AVAILABLE",
            req.query.status
          )
        ) {
          query.status = {
            [Op.eq]: req.query.status,
          };
        } else {
          return res.status(400).json({
            message: "Invalid Status",
          });
        }
      }

      const restaurants = await restaurantService.findAllRestaurant({
        query: query,
      });

      if (!restaurants) {
        return res.status(204).json({});
      } else {
        if (req.query.promotions) {
          return res.status(200).json({
            restaurants: restaurants.filter((e) => e.promotions.length > 0),
          });
        }
        return res.status(200).json({
          restaurants: restaurants,
        });
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
