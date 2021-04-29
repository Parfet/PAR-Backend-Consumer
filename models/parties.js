"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parties.belongsToMany(models.users, {
        through: models.users_parties,
        foreignKey: "party_id",
      });
      Parties.hasMany(models.rating_restaurants, {
        foreignKey: "party_id",
      });
      Parties.hasMany(models.rating_users, {
        foreignKey: "party_id",
      });
      Parties.belongsToMany(models.restaurants, {
        through: models.restaurants_parties,
        foreignKey: "party_id"
      })
    }
  }
  Parties.init(
    {
      party_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      party_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      head_party: {
        type: DataTypes.UUID,
        references: {
          table: "users",
          fields: "user_id",
        },
      },
      passcode: DataTypes.STRING,
      party_type: {
        type: DataTypes.ENUM("PRIVATE", "PUBLIC"),
        allowNull: false,
      },
      interested_topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      interested_tag: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
      },
      max_member: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      schedule_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      archived_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      member: DataTypes.ARRAY(DataTypes.UUID),
    },
    {
      sequelize,
      modelName: "parties",
      timestamps: false,
      underscored: true,
    }
  );
  return Parties;
};
