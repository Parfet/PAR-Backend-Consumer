"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PartiesInterestTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  PartiesInterestTags.init(
    {
      party_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: false,
      },
      tag_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "parties_interest_tags",
    }
  );
  return PartiesInterestTags;
};
