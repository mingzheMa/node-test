/*
 * @Author: marx
 * @Date: 2020-08-04 17:32:25
 * @LastEditTime: 2020-08-06 16:41:34
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/src/文件流.js
 */
const fs = require("fs");
const path = require("path");

const file1 = path.resolve("./view/test.js");
const file2 = path.resolve("./view/test2.js");

async function test1() {
  console.time("test1");
  const rs = await fs.promises.readFile(file1);
  await fs.promises.writeFile(file2, rs);
  console.timeEnd("test1");
}

// async function test2() {
//   console.time("test2");
//   const rs = fs.createReadStream(file1);
//   const ws = fs.createWriteStream(file2);

//   rs.on("data", (data) => {
//     const isWrite = ws.write(data);

//     if (!isWrite) {
//       rs.pause();
//     }
//   });

//   ws.on("drain", () => {
//     rs.resume();
//   });

//   rs.on("close", () => {
//     ws.end();
//     console.timeEnd("test2");
//   });
// }

async function test2() {
  console.time("test2");
  const rs = fs.createReadStream(file1);
  const ws = fs.createWriteStream(file2);

  rs.pipe(ws);

  rs.on("close", () => {
    ws.end();
    console.timeEnd("test2");
  });
}

async function match() {
  await test1();
  await fs.unlinkSync(file2, () => {
    console.log("删除file2");
  });
  await test2();
}

match();
