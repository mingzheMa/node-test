/*
 * @Author: marx
 * @Date: 2020-08-13 18:01:33
 * @LastEditTime: 2020-08-13 18:50:37
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/src/sql.js
 */
const mysql = require("mysql2");
const Mock = require("mockjs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "return0412",
  database: "company_info"
});

const tableName = "company";

// 查表
connection.query(`select * from ${tableName}`, (err, res) => {
  //   console.log(res);
});

const Random = Mock.Random;

let sql = "";
for (let i = 0; i < 10; i++) {
  const data = {
    name: `${Random.region()}${Random.cword(2)}股份有限公司`,
    position: `${Random.province()}${Random.city()}${Random.county()}`
  };

  sql += `(null,'${data.name}','${data.position}'),`;
}

connection.query(
  `insert into ${tableName} values ${sql.substring(0, sql.length - 1)};`,
  (err, res) => {
    console.log(res);
  }
);

connection.end();
