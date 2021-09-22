"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsToMany(models.parties, {
        through: models.users_parties,
        foreignKey: "user_id",
        constraints: false,
      });
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "users",
      timestamps: false,
      underscored: true,
    }
  );
  return Users;
};
