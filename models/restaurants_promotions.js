"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RestaurantsPromotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  RestaurantsPromotions.init(
    {
      restaurant_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: false,
      },
      promotion_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "restaurants_promotions",
    }
  );
  return RestaurantsPromotions;
};
