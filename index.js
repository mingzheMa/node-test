const mysql = require("mysql2/promise");

(async function () {
  const pool = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "return0412",
    database: "test",
    // waitForConnections: true, // 如果线程数量大于线程池的连接限制，则等待，默认true
    connectionLimit: 10, // 线程池连接限制
    queueLimit: 0 // 大于连接限制的等待队列长度，0为没有限制
  });

  const [data] = await pool.execute("SELECT * FROM company WHERE id=?", [1]);
  console.log(data);
})();
