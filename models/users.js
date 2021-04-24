'use strict';
const moment = require('moment-timezone');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users.hasOne(models.parties, {
      //   foreignKey: 'head_party_user_id',
      //   foreignKeyConstraint: false
      // })
    }
  };
  Users.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    first_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name_th: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name_en: {
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
    //
    // === [FORMAT] ===
    //Thu Apr 08 2021 17:27:37 GMT+0700
    // 
    //     
    created_at: {
      type: DataTypes.DATE,
      defaultValue: moment()
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: moment(),
      allowNull: false,
    },
    archived_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: null,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'users',
    underscored: true,
  }, );
  return Users;
};