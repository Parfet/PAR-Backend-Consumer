"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RatingUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RatingUsers.belongsTo(models.users, {
        through: "user_id",
        foreignKey: ["give_rate_user_id", "receive_rate_user_id"],
      });
    }
  }
  RatingUsers.init(
    {
      party_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      give_rate_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      receive_rate_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "rating_users",
    }
  );
  return RatingUsers;
};
