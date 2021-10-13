"use strict";
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "restaurants",
      [
        {
          restaurant_id: "YaRJKzxYAhlKh3PLL3xZ",
          restaurant_name: "test restaurant",
          created_at: "2021-10-06 16:17:12.204+00",
          lat: 13.0,
          lng: 100.0,
          restautant_photo_ref: "not_have_any_photo",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("restaurants", null, {});
  },
};
