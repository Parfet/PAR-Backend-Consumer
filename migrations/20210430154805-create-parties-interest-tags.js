"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("parties_interest_tags", {
      party_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: false,
      },
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint("parties_interest_tags", {
      fields: ["party_id"],
      type: "foreign key",
      name: "parties_interest_tags-parties-party_id",
      references: {
        table: "parties",
        field: "party_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addConstraint("parties_interest_tags", {
      fields: ["tag_id"],
      type: "foreign key",
      name: "parties_interest_tags-interest_tags-tag_id",
      references: {
        table: "interest_tags",
        field: "tag_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryIntereface.removeColumn("parties_interest_tags", "party_id");
    await queryIntereface.removeColumn("parties_interest_tags", "tag_id");
    await queryInterface.dropTable("parties_interest_tags");
  },
};
