"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurants.belongsToMany(models.parties, {
        through: models.restaurants_parties,
        foreignKey: "restaurant_id",
      });
      Restaurants.belongsToMany(models.promotions, {
        through: models.restaurants_promotions,
        foreignKey: "restaurant_id",
        as: 'promotions'
      });
      Restaurants.hasOne(models.schedule_days, {
        foreignKey: "restaurant_id",
      });
    }
  }
  Restaurants.init(
    {
      restaurant_id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      restaurant_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      //
      // === [FORMAT] ===
      //Thu Apr 08 2021 17:27:37 GMT+0700
      //
      //
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: "restaurants",
    }
  );
  return Restaurants;
};
