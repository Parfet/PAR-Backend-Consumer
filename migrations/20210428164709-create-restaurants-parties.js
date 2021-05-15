"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("restaurants_parties", {
      restaurant_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      party_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("restaurants_parties", {
      fields: ["restaurant_id"],
      type: "foreign key",
      name: "restaurants_parties-restaurants-restaurant_id",
      references: {
        table: "restaurants",
        field: "restaurant_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addConstraint("restaurants_parties", {
      fields: ["party_id"],
      type: "foreign key",
      name: "restaurants_parties-parties-party_id",
      references: {
        table: "parties",
        field: "party_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn("restaurants_parties", "restaurant_id");
    await queryInterface.removeColumn("restaurants_parties", "party_id");
    await queryInterface.dropTable("restaurants_parties");
  },
};
