/*
 * @Author: marx
 * @Date: 2020-08-06 16:47:05
 * @LastEditTime: 2020-08-07 11:33:30
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/src/netConnection.js
 */
const net = require("net");
const path = require("path");
const fs = require("fs");

const cc = net.createConnection({ host: "localhost", port: 9527 });

cc.on("connect", () => {
  console.log("发送成功");
});

cc.write(`GET / HTTP/1.1

拿个图片`);

cc.on("data", (res) => {
  const body = setBody(res);
  const filePath = path.resolve("./jojos.png");

  fs.writeFile(filePath, body, () => {
    cc.end();
  });
});

function setBody(res) {
  const utf8 = res.toString("utf-8");
  const utf8arr = utf8.split("\n\n");
  return Buffer.from(utf8arr[utf8arr.length - 1]);
}
