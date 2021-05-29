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
    const restaurant = await queryInterface.rawSelect(
      "restaurants",
      {
        where: {
          restaurant_name: "นัดแซ่บ",
        },
      },
      ["restaurant_id"]
    );
    await queryInterface.bulkInsert("promotions", [
      {
        promotion_id: promotion_id,
        promotion_title: "มา 4 จ่าย 3",
        promotion_description: "ถ้าจับกลุ่มกันมา 4 คน จ่ายในราคาเพียงแค่ 3 คน",
        promotion_condition: "ต้องจับกลุ่มมาอย่างน้อย 4 คน มากสุดไม่เกิน 8 คน",
      },
    ]);

    return queryInterface.bulkInsert("restaurants_promotions", [
      {
        promotion_id: promotion_id,
        restaurant_id: restaurant,
      },
    ]);
  },

  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete("promotions", null, {}),
};
