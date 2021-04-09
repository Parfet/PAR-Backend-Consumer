'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_blacklists', {
      user_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Users,
        //   key: user_id,
        // },
      },
      blacklist_user_id: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        // references: {
        //   model: Users,
        //   key: user_id,
        // },
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('user_blacklists');
  }
};