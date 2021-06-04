const mysql = require("mysql2");

// 创建数据库连接
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "return0412",
  database: "test"
  // multipleStatements: true
});

// 每一次操作数据库后会自动断开，如果次数多会增加数据库和服务器压力
// 这里可以选择一个线程池，当池中的线程超出时，其余的线程会等待，如果池中一定时间没有线程，则会断开连接
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "return0412",
  database: "test",
  // waitForConnections: true, // 如果线程数量大于线程池的连接限制，则等待，默认true
  connectionLimit: 10, // 线程池连接限制
  queueLimit: 0 // 大于连接限制的等待队列长度，0为没有限制
});

// 增加
// connection.query(
//   `INSETT INTO company(name,location,buildDate) VALUES(1,2,2020-01-01)`,
//   (err, results, fields) => {
//     console.log(results);
//   }
// );

// 修改
// connection.query(
//   `UPDATE company SET name=222 WHERE id=4`,
//   (err, results, fields) => {
//     console.log(results);
//   }
// );

// 删除
// connection.query("DELETE FROM company WHERE id=4", (err, results, fields) => {
//   console.log(results);
// });

// 查询
// connection.query("SELECT * FROM company", (err, results, fields) => {
//   console.log(results);
// });
// pool.query(`SELECT * FROM company`, (err, results, fields) => {
//   console.log(err);
//   console.log(results);
// });

// 防止sql注入
// connection.execute("SELECT * FROM company WHERE id=?", [1], (err, results) => {
//   console.log(err);
//   console.log(results);
// });
// pool.execute(
//   "SELECT * FROM company WHERE id=?",
//   [1],
//   (err, results, fields) => {
//     console.log(err);
//     console.log(results);
//   }
// );
