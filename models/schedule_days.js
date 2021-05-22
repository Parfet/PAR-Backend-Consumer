"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScheduleDays extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScheduleDays.belongsTo(models.restaurants, {
        foreignKey: "restaurant_id",
      });
    }
  }
  ScheduleDays.init(
    {
      restaurant_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      schedule_day: {
        type: DataTypes.ENUM(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "schedule_days",
    }
  );
  return ScheduleDays;
};
