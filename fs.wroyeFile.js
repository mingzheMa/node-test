const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files/txt.txt");
const txt = "txt";

// 写入数据（路径，内容，配置?:{},回调）
fs.writeFile(
  filePath,
  txt,
  {
    encoding: "utf-8", // 默认
    mode: "0666", // 默认 可读可写模式
    flag: "a", // 追加 默认 w 
  },
  (err, res) => {
    console.log("over");
  }
);
