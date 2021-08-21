"use strict";
const { v4: uuidv4 } = require("uuid");
const promotion_id = uuidv4();
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
  },

  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete("promotions", null, {}),
};
