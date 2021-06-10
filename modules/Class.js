const { DataTypes } = require("sequelize");
const db = require("./db");
const dayjs = require("dayjs");

module.exports = db.define(
  "Class",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const date = this.getDataValue("created_date");
        return dayjs(date).local().format();
      },
      set(date) {
        this.setDataValue("created_date", dayjs(date).utc().format());
      }
    }
  },
  {
    freezeTableName: false,
    paranoid: true
  }
);
