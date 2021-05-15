"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert("interest_tags", [
      {
        tag_id: uuidv4(),
        tag_name: "Technology"
      },
      {
        tag_id: uuidv4(),
        tag_name: "Developer"
      },
      {
        tag_id: uuidv4(),
        tag_name: "แมว"
      },
      {
        tag_id: uuidv4(),
        tag_name: "หมา"
      },
      {
        tag_id: uuidv4(),
        tag_name: "เรื่อยเปื่อย"
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("interest_tags", null, {});
  },
};
