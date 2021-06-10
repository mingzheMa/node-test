const { DataTypes } = require("sequelize");
const db = require("./db");
const md5 = require("md5");

module.exports = db.define(
  "Admin",
  {
    user_name: {
      type: DataTypes.STRING, // 字段类型
      allowNull: false // 能否为null
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        console.log(val)
        this.setDataValue("password", md5(val));
      }
    },
    nick_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: false, // 是否自动在表名后面加s，默认为false
    paranoid: true // 是否增加deletedAt列（删除日期）
    // deletedAt: "", // deletedAt列名
    // tableName:"", // 表名
  }
);
