const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files/test.txt");

// 读取文件（路径，回调）
// fs.readFile(filePath, (err, res) => {
//   console.log(res);
// });

// 读取文件（路径，配置，回调）
// fs.readFile(
//   filePath,
//   {
//     encoding: "utf-8"
//   },
//   (err, res) => {
//     console.log(res);
//   }
// );

// fs.readFile(filePath, "utf-8", (err, res) => {
//   console.log(res);
// });

// 读取文件同步
// const res = fs.readFileSync(filePath, "utf-8");
// console.log(res);

// 读取文件返回promise
// fs.promises.readFile(filePath, "utf-8").then(res => {
//   console.log(res);
// });
