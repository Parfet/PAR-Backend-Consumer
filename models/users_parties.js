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
    user_id: {
      type: DataTypes.UUID,
      // references: {
      //   model: Users,
      //   key: user_id,
      // },
    },
    party_id: {
      type: DataTypes.UUID,
      // references: {
      //   model: Parties,
      //   key: party_id,
      // },
    }
  }, {
    sequelize,
    modelName: 'users_parties',
  });
  return UsersParties;
};