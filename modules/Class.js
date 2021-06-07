const { DataTypes } = require("sequelize");
const db = require("./db");

module.exports = db.define(
  "Class",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    freezeTableName: false,
    paranoid: true
  }
);
