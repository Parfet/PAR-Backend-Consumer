"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBlacklists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBlacklists.init(
    {
      user_id: {
        type: DataTypes.STRING,
      },
      blacklist_user_id: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "user_blacklists",
    }
  );
  return UserBlacklists;
};
