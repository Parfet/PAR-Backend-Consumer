"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users_interest_tags", {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("users_interest_tags", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_interest_tags-user_id",
      references: {
        table: "users",
        field: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addConstraint("users_interest_tags", {
      fields: ["tag_id"],
      type: "foreign key",
      name: "users_interest_tags-tag_id",
      references: {
        table: "interest_tags",
        field: "tag_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, _) => {
    await queryInterface.dropTable("users_interest_tags");
  },
};
