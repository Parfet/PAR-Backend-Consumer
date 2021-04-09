'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_parties', {
      user_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Users,
        //   key: user_id,
        // },
      },
      party_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Parties,
        //   key: party_id,
        // },
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users_parties');
  }
};