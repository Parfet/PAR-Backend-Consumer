'use strict';
const moment = require('moment-timezone');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
      first_name_th: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name_th: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name_en: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name_en: {
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
      archived_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      image_url: {
        type: Sequelize.STRING,
        defaultValue: null,
      }
    });
    
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users');
  }
};