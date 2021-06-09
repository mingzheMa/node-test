require("./modules/index");
const adminServ = require("./services/admin");
// const bookServ = require("./services/book");

// 测试连接
// async function test() {
//   try {
//     await db.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }

// test();
adminServ
  .login(111, 1111)
  .then(res => console.log(res))
  .catch(err => console.log(err));
