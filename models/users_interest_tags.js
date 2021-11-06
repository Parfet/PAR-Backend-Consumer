"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersInterestTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersInterestTags.init(
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: false,
      },
      tag_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: false,
        allowNull: false,
      },
    },
    {
      sequelize,
    underscored: true,
      timestamps: false,
      modelName: "users_interest_tags",
    }
  );
  return UsersInterestTags;
};
