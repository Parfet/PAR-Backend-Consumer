const { BadRequest } = require("../utils/errors");
const restaurantService = require("../services/restaurants_service");

module.exports = {
  findAllRestaurant: async (req, res) => {
    try {
      const restaurants = await restaurantService.findAllRestaurant();
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
