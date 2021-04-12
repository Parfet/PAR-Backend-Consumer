'use strict';
const {
  Users
} = require('../models/users');
const {
  user_id
} =
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parties', {
      party_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      head_party: {
        type: Sequelize.UUID,
        // references: {
        //   model: Users,
        //   key: Users.user_id,
        // },
      },
      party_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passcode: Sequelize.STRING,
      party_type: {
        type: Sequelize.ENUM('PRIVATE', 'PUBLIC'),
        allowNull: false,
      },
      interested_topic: Sequelize.STRING,
      max_member: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      schedule_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      archived_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      member: {
        type: Sequelize.ARRAY(Sequelize.UUID)
        // references: {
        //   model: Users,
        //   key: Users.user_id,
        // }
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('parties');
  }
};