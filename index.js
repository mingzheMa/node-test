const fs = require("fs");
const path = require("path");

const orginPath = path.resolve(__dirname, "./files/test1.txt");
const targetPath = path.resolve(__dirname, "./files/test2.txt");

const rs = fs.createReadStream(orginPath);
const ws = fs.createWriteStream(targetPath, {
  highWaterMark: 3
});


// 手动实现读取写入流
// rs.on("data", chunk => {
//   const isWrite = ws.write(chunk);

//   if (!isWrite) {
//     // 产生背压
//     rs.pause();
//   }
// });

// // 写入流请空
// ws.on("drain", () => {
//   rs.resume();
// });

// 和以上代码类似
rs.pipe(ws)