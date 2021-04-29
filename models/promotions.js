'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promotions.belongsToMany(models.restaurants, {
        through: models.restaurants_promotions,
        foreignKey: 'promotion_id'
      })
    }
  };
  Promotions.init({
    promotion_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    promotion_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    promotion_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    promotion_condition : {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'promotions',
  });
  return Promotions;
};