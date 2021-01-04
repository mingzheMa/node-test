/*
 * @Author: marx
 * @Date: 2020-08-06 16:47:05
 * @LastEditTime: 2020-08-07 11:11:27
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/src/netServe.js
 */
const net = require("net");
const path = require("path");
const fs = require("fs");

const cs = net.createServer();

cs.on("connection", (a) => {
  getConnection(a);
});

cs.on("end", (a) => {
  console.log("服务器关闭", a);
});

cs.listen(9527, () => {
  console.log("服务器监听9527端口");
});

function getConnection(a) {
  a.on("data", async (res) => {
    console.log("收到请求数据", res.toString("utf-8"));

    const header = getHeader();
    const body = await readImg();

    const ren = Buffer.concat([header, body]);
    a.write(ren);
  });
}

function getHeader() {
  return Buffer.from(
    `HTTP/1.1 200 OK
Content-Type: image/png

`
  );
}

async function readImg() {
  const imgPath = path.resolve("./img/jojo.png");
  const rs = await fs.promises.readFile(imgPath);
  return rs;
}
