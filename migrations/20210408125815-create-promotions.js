'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('promotions', {
      promotion_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      promotion_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      promotion_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      promotion_condition : {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('promotions');
  }
};