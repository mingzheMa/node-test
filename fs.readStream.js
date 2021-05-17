const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files/test.txt");

// 创建一个可读流
const readStream = fs.createReadStream(filePath, {
  encoding: "utf-8",
  autoClose: true, // 自动关闭
  highWaterMark: 1 // 一次操作字节
  // start:0, // 从第几个字节开始
  // end:0, // 从第几个字节结束
});

// 文件打开事件
readStream.on("open", () => {
  console.log("open the file");
});

// 文件准备事件
readStream.on("ready", () => {
  console.log("file is ready");
});

// 读取数据
// tips：如果你需要拿到文件的全部数据，那么你应该使用readFile读取
readStream.on("data", chunk => {
  console.log(chunk);

  readStream.pause();
  setTimeout(() => {
    readStream.resume();
  }, 1000);
});

// 读取结束
readStream.on("end", () => {
  console.log("read is end");
});

// 文件关闭
readStream.on("close", () => {
  console.log("file is close");
});

// 读取暂停
readStream.on("pause", () => {
  console.log("read is pause");
});

// 读取暂停
readStream.on("resume", () => {
  console.log("read is resume");
});
