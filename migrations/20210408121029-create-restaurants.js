'use strict';
const moment = require('moment');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurants', {
      restaurant_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true
      },
      restaurant_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tel_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      verify_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }, 
      status: {
        type: Sequelize.ENUM('OPEN', 'CLOSED'),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      opened_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      closed_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //
      // === [FORMAT] ===
      //Thu Apr 08 2021 17:27:37 GMT+0700
      // 
      //     
      created_at: {
        type: Sequelize.DATE,
        defaultValue: moment()
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: moment(),
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      lon: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('restaurants');
  }
};