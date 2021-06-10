const { DataTypes } = require("sequelize");
const db = require("./db");
const dayjs = require("dayjs");

module.exports = db.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const date = this.getDataValue("birth_date");
        return dayjs(date).local().format();
      },
      set(date) {
        this.setDataValue("birth_date", dayjs(date).utc().format());
      }
    },
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        return dayjs().diff(dayjs(this.birth_date), "year");
      },
      set() {
        throw "不要尝试设置 `age` 的值!";
      }
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  },
  {
    freezeTableName: false,
    paranoid: true
  }
);
