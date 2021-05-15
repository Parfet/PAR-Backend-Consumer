"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RestaurantsParties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  RestaurantsParties.init(
    {
      restaurant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      party_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "restaurants_parties",
    }
  );
  return RestaurantsParties;
};
