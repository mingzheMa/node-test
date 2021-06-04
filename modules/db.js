const { Sequelize } = require("sequelize");

module.exports = new Sequelize("school", "root", "return0412", {
  host: "localhost",
  dialect: "mysql", // /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  logging: false
});
