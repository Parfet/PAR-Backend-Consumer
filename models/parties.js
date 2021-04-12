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
      this.myAssociation = models.Parties.belongsTo(models.Users);
    }
  }
  Parties.init(
    {
      party_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      head_party: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      party_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      member: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        // references: {
        //   model: Users,
        //   key: user_id,
        // }
      },
    },
    {
      sequelize,
      modelName: "parties",
      timestamps: false,
    }
  );
  return Parties;
};
