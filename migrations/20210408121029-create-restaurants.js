"use strict";
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("restaurants", {
      restaurant_id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
      },
      restaurant_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      //
      // === [FORMAT] ===
      //Thu Apr 08 2021 17:27:37 GMT+0700
      //
      //
      created_at: {
        type: Sequelize.DATE,
        defaultValue: moment(),
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("restaurants");
  },
};
