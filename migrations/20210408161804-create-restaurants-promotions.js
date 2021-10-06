"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("restaurants_promotions", {
      restaurant_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      promotion_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("restaurants_promotions", {
      fields: ["restaurant_id"],
      type: "foreign key",
      name: "restaurants_promotions-restaurant_id",
      references: {
        table: "restaurants",
        field: "restaurant_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addConstraint("restaurants_promotions", {
      fields: ["promotion_id"],
      type: "foreign key",
      name: "restaurants_promotions-promotion_id",
      references: {
        table: "promotions",
        field: "promotion_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn(
      "restaurants_promotions",
      "restaurant_id"
    );
    await queryInterface.removeColumn("restaurants_promotions", "promotion_id");
    await queryInterface.dropTable("restaurants_promotions");
  },
};
