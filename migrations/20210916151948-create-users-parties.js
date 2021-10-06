"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users_parties", {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      party_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
      },
      status: {
        type: Sequelize.ENUM(["ACCEPT", "DECLINE", "WAITING"]),
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("users_parties", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_parties-user_id",
      references: {
        table: "users",
        field: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addConstraint("users_parties", {
      fields: ["party_id"],
      type: "foreign key",
      name: "users_parties-party_id",
      references: {
        table: "parties",
        field: "party_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("users_parties");
  },
};
