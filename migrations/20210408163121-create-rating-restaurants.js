'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rating_restaurants', {
      party_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
        // references: {
        //   model: Parties,
        //   key: party_id,
        // },
      },
      restaurant_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
        // references: {
        //   model: Restaurants,
        //   key: restaurant_id,
        // },
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
        // references: {
        //   model: Users,
        //   key: user_id,
        // },
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      review: {
        type: Sequelize.TEXT,
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('rating_restaurants');
  }
};