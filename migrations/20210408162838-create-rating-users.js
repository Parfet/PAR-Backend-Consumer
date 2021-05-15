"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("rating_users", {
      party_id: {
        type: Sequelize.UUID,
      },
      give_rate_user_id: {
        type: Sequelize.UUID,
      },
      receive_rate_user_id: {
        type: Sequelize.UUID,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    });

    await queryInterface.addConstraint("rating_users", {
      fields: ["party_id"],
      type: "foreign key",
      name: "rating_users-parties-party_id",
      references: {
        table: "parties",
        field: "party_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addConstraint("rating_users", {
      fields: ["give_rate_user_id"],
      type: "foreign key",
      name: "rating_users-users-give-user_id",
      references: {
        table: "users",
        field: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addConstraint("rating_users", {
      fields: ["receive_rate_user_id"],
      type: "foreign key",
      name: "rating_users-users-receive-user_id",
      references: {
        table: "users",
        field: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("rating_users");
  },
};
