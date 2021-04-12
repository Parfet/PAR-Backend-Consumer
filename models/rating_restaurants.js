'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RatinRestaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RatinRestaurants.init({
    party_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
      // references: {
      //   model: Parties,
      //   key: party_id,
      // },
    },
    restaurant_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
      // references: {
      //   model: Restaurants,
      //   key: restaurant_id,
      // },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
      // references: {
      //   model: Users,
      //   key: user_id,
      // },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    review: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'rating_restaurants',
  });
  return RatinRestaurants;
};