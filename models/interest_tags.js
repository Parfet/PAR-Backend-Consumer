"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InterestTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InterestTags.belongsToMany(models.parties, {
        through: models.parties_interest_tags,
        foreignKey: "tag_id",
        constraint: false,
      });
    }
  }
  InterestTags.init(
    {
      tag_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tag_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "interest_tags",
    }
  );
  return InterestTags;
};
