'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedule_days', {
      restaurant_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: Restaurant,
        //   key: restaurant_id,
        // },
      },
      schedule_day: {
        type: Sequelize.ENUM(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('schedule_days');
  }
};