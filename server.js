const http = require("http");

const server = http.createServer();

server.listen(9527, () => {
  console.log("server listen 9527");
});

// 获取请求（头体）数据
function handleReq(req) {
  req.setEncoding("utf-8");
  console.log("path", req.url);
  console.log("method", req.method);
  console.log("headers", req.headers);

  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", () => {
    console.log("body", body);
  });
}

// 设置响应（头体）
function handleRes(res) {
  // 设置响应头
  res.setHeader("a", 1);
  res.setHeader("b", 2);

  // 设置响应HTTP状态码
  res.statusCode = 400;

  // 设置响应体
  res.write("error");
  res.end();
}

server.on("request", (req, res) => {
  console.log("request");
  handleReq(req);
  handleRes(res);
});
