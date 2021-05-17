const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files/test1.txt");

const ws = fs.createWriteStream(filePath, {
  highWaterMark: 3,
  flags: "a"
});

// 文件打开
// ws.on("open", () => {
//   console.log("open the file");
// });

// 文件准备就绪
// ws.on("ready", () => {
//   console.log("write is ready");
// });

// 写入操作（返回是否产生背压）
// const isWrite = ws.write("a");
// const isWrite = ws.write("aaaaaa");
// console.log(isWrite);

// 可以继续写入到流时触发
// 当即将产生背压时才可能触发时间，如果不会产生背压则不会触发函数
// ws.write("aaaaaaaaa")
// ws.write("a")
// ws.on("drain",() => {
//   console.log("can continue to write")
// })

// 例子 在不产生背压的情况下写入10m数据
function createWriteFunc(ws) {
  let isWrite = true;
  let size = 0;

  return () => {
    while (size < 1024 * 1024 && isWrite) {
      isWrite = ws.write("a");
      console.log(size);
      if (!isWrite) {
        // 产生背压
        isWrite = true;
        return;
      }

      size++;
    }
  };
}

const writeFunc = createWriteFunc(ws);

writeFunc();

ws.on("drain", () => {
  console.log("drain");
  writeFunc();
});
