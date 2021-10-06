"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("rating_users", {
      party_id: {
        type: Sequelize.UUID,
      },
      give_rate_user_id: {
        type: Sequelize.STRING,
      },
      receive_rate_user_id: {
        type: Sequelize.STRING,
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
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("rating_users");
  },
};
