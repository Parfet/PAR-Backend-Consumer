'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurants_promotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  };
  Restaurants_promotions.init({
    restaurant_id: {
      type: DataTypes.UUID,
      // references: {
      //   model: Restaurants,
      //   key: restaurant_id
      // }
    },
    promotion_id: {
      type: DataTypes.UUID,
      // references: {
      //   model: Promotions,
      //   key: promotion_id
      // }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'restaurants_promotions',
  });
  return Restaurants_promotions;
};