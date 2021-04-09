'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RatingUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RatingUsers.init({
    party_id: {
      type: DataTypes.UUID,
      // references: {
      //   model: Parties,
      //   key: party_id
      // },
    },
    give_rate_user_id: {
      type: DataTypes.UUID,
      // references: {
      //   model: Users,
      //   key: user_id
      // },
    },
    receive_rate_user_id: {
      type: DataTypes.UUID,
      // references: {
      //   model: Users,
      //   key: user_id
      // },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  }, {
    sequelize,
    modelName: 'rating_users',
  });
  return RatingUsers;
};