'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_blacklists', {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blacklist_user_id: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('user_blacklists', 'user_id');
    await queryInterface.removeColumn('user_blacklists', 'user_blacklists');
    await queryInterface.dropTable('user_blacklists');
  }
};