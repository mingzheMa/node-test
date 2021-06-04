const { DataTypes } = require("sequelize");
const db = require("./db");

module.exports = db.define(
  "Book",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: false,
    paranoid: true
  }
);
