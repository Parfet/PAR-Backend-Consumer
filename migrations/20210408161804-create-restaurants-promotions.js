'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurants_promotions', {
      restaurant_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Restaurants,
        //   key: restaurant_id
        // }
      },
      promotion_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Promotions,
        //   key: promotion_id
        // }
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('restaurants_promotions');
  }
};