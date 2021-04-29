"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RatingRestaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RatingRestaurants.belongsTo(models.parties, {
        foreignKey: "party_id",
      });
    }
  }
  RatingRestaurants.init(
    {
      party_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      review: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "rating_restaurants",
    }
  );
  return RatingRestaurants;
};
