const net = require("net");
const fs = require("fs");
const path = require("path");

// 创建一个TCP/IP服务（配置，监听函数）
const server = net.createServer(() => {
  console.log("server is connect");
});

// 监听端口
server.listen(9527);

// 监听端口后触发
server.on("listening", () => {
  console.log("server listen 9527");
});

// 监听有连接服务事件
server.on("connection", async socket => {
  // 读取文件
  const imgPath = path.resolve(__dirname, "./img/wuyanzu.jpeg");
  const bodyBuffer = await fs.promises.readFile(imgPath);

  // 头部buffer
  const headBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`);

  // 合并buffer
  const result = Buffer.concat([headBuffer, bodyBuffer]);

  // 写入流
  socket.write(result);

  // 结束
  socket.end();
});
