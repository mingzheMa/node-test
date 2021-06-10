const { DataTypes } = require("sequelize");
const db = require("./db");

module.exports = db.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    class_id: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    freezeTableName: false,
    paranoid: true
  }
);
