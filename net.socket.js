const net = require("net");

// 创建一个连接（配置，回调）
// 该方法建立的是一个TCP/IP协议，所谓的http（请求格式：请求头、请求体、请求方式）协议是建立在TCP/IP协议之上的
// 该方法返回一个双工流，写入socket流会自动发送到服务器，服务器返回自动写入到socket流中
const socket = net.createConnection({
  host: "www.baidu.com",
  port: 80
});

// 修改读取流的编码，适用于双工流
socket.setEncoding("utf-8")

// 读取流的事件
socket.on("data", data => {
  // 首次读取的时候会带有请求头
  // Content-Length 表示请求体的大小，根据该字段判断服务端是否写入完毕
  console.log(data);
});

// 写入流
// Connection: keep-alive，表示需要客户端或服务端一方主动断开请求，否则服务端会等一段时间在挂断
socket.write(`GET / HTTP/1.1
Host: www.baidu.com
Connection: keep-alive

`);
