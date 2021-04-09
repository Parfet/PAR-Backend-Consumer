'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rating_users', {
      party_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Parties,
        //   key: party_id
        // },
      },
      give_rate_user_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Users,
        //   key: user_id
        // },
      },
      receive_rate_user_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Users,
        //   key: user_id
        // },
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('rating_users');
  }
};