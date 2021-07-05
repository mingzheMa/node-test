// 1.建立TCP/IP协议，进行三次握手
//
// 2.客户端发送GET请求，查看服务端是否支持socket连接，包含如下请求头
//   Connection: Upgrade // 连接方式为升级版的连接
//   Upgrade: websocket // 升级版连接的方式为websocket连接
//   Sec-WebSocket-Key: 2UFpAEEKa03FoRgaCFK50g== // 一个秘钥，需要服务端处理后返回
//
// 3.服务端返回
//   Upgrade: websocket
//   Connection: Upgrade
//   Sec-WebSocket-Accept: [key] // [key]为Sec-WebSocket-Key处理后的秘钥
//
// 4.建立连接，任何一端都可以向对方发送请求
//
// 5.任何一方断开，通道关闭

const { createHash } = require("crypto");
const net = require("net");

function getHeaders(chunk) {
  let parts = chunk.toString("utf-8").split("\r\n");
  parts.shift();
  parts = parts
    .filter(s => s)
    .map(s => {
      const i = s.indexOf(":");
      return [s.substr(0, i), s.substr(i + 1).trim()];
    });
  return Object.fromEntries(parts);
}

const server = net.createServer(socket => {
  socket.once("data", chunk => {
    const headers = getHeaders(chunk);

    const hash = createHash("sha1");
    hash.update(`${headers["Sec-WebSocket-Key"]}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`); // 后面跟着一串是写死的
    const key = hash.digest("base64");

    socket.write(`HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ${key}

`);
  });

  socket.on("data", chunk => {
    console.log(chunk.toString("utf-8"));
  });
});

server.listen("9527", () => {
  console.log("server listen 9527");
});
