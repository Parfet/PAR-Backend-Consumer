'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_blacklists', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      blacklist_user_id: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('user_blacklists', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_blacklists-users-user_id',
      references: {
        table: 'users',
        field: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('user_blacklists', 'user_id');
    await queryInterface.removeColumn('user_blacklists', 'user_blacklists');
    await queryInterface.dropTable('user_blacklists');
  }
};