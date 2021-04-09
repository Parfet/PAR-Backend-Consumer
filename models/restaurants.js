'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurants.init({
    restaurant_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    restaurant_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    verify_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }, 
    status: {
      type: DataTypes.ENUM('OPEN', 'CLOSED'),
      allowNull: false,
    },
    opened_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closed_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //
    // === [FORMAT] ===
    //Thu Apr 08 2021 17:27:37 GMT+0700
    // 
    //     
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'restaurants',
  });
  return Restaurants;
};