const { DataTypes } = require("sequelize");
const db = require("./db");
const dayjs = require("dayjs");

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
      allowNull: false,
      get() {
        const date = this.getDataValue("publication_date");
        return dayjs(date).local().format();
      },
      set(date) {
        this.setDataValue("publication_date", dayjs(date).utc().format());
      }
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
