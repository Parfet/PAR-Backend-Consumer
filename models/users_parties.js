'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersParties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UsersParties.init({
    party_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    status: {
      type: DataTypes.ENUM(['ACCEPT', 'DECLINE', 'WAITING']),
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'users_parties',
  });
  return UsersParties;
};