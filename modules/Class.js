const { DataTypes } = require("sequelize");
const db = require("./db");
const student = require("./Student");

module.exports = db
  .define(
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
  )
  .hasOne(student, {
    foreignKey: "class_id" // 设置外键名称
  });
