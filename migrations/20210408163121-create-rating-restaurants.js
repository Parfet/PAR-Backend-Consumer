"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("rating_restaurants", {
      party_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      review: {
        type: Sequelize.TEXT,
      },
    });
    await queryInterface.addConstraint("rating_restaurants", {
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
    await queryInterface.dropTable("rating_restaurants");
  },
};
