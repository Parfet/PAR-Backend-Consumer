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
        res.status(204).json({});
      } else {
        res.status(200).json({
          restaurants: restaurants,
        });
      }
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  },
};
