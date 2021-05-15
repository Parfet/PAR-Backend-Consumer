"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("parties", {
      party_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      party_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      head_party: {
        type: Sequelize.UUID,
      },
      passcode: Sequelize.STRING,
      party_type: {
        type: Sequelize.ENUM("PRIVATE", "PUBLIC"),
        allowNull: false,
      },
      interested_topic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      max_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      schedule_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      archived_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
    await queryInterface.addConstraint("parties", {
      fields: ["head_party"],
      type: 'foreign key',
      name: 'parties-users-user_id',
      references: {
        table: "users",
        field: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn("parties", "head_party");
    await queryInterface.dropTable("parties");
  },
};
