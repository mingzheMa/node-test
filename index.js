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
  .findAndCountAll(1, 100, { nick_name: "芳" })
  .then(res => console.log(res));
