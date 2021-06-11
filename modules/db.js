const { Sequelize } = require("sequelize");
const { sqlLogger } = require("../utils/log4js");

module.exports = new Sequelize("school", "root", "return0412", {
  host: "localhost",
  dialect: "mysql", // /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  logging(msg) {
    sqlLogger.info(msg)
  }
});
