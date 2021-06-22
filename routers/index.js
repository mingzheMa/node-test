const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");
const tokenMiddleware = require("./middleware/token");

const loginRouter = require("../api/login");
const adminRouter = require("../api/admin");
const studentRouter = require("../api/student");

const app = express();

// jsonp跨域处理
// 局限性：由于script只能发送get请求所以，其他请求方式不适用
// 格式混乱：因为content-type只能是JavaScript，所以没法约定格式
app.get("/api/jsonp", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.send("callback('jsonpdata...')");
});

// cors跨域处理
// app.use("/api/cors", (req, res) => {
//   // 处理简单请求
//   // 设置允许跨域的源
//   res.set("Access-Control-Allow-Origin", req.headers.origin);

//   // 处理预检请求
//   if (req.method === "OPTIONS") {
//     // 设置允许跨域的方法
//     res.set(
//       "Access-Control-Allow-Methods",
//       req.headers["access-control-request-method"]
//     );
//     // 设置允许修改的请求头
//     res.set(
//       "Access-Control-Allow-Headers",
//       req.headers["access-control-request-headers"]
//     );
//     // 设置预检请求的有效时间(秒)，过了时间需要重新预检请求，如果没有超过时间则不需要
//     res.set("Access-Control-Max-Age", 3600);
//   }

//   // 处理附带身份凭证（cookie）的请求
//   // 设置允许附加cookie
//   res.set("Access-Control-Allow-Credentials", true);

//   res.send("corsData");
// });

// cors跨域处理
app.use("/api/cors", cors(), (req, res) => {
  res.send("corsData");
});

// 跨域中间件
app.use(cors())

// 静态资源中间件
app.use(express.static(path.resolve(__dirname, "../client")));

// 处理请求体的中间件处理后将结果放置res.body中
// 处理请求体中的application/x-www-form-urlencoded格式参数（该格式为a=1&b=2）
app.use(express.urlencoded());

// 处理请求体中的application/json格式参数
app.use(express.json());

// 处理请求体中的text/plain格式参数
app.use(express.text());

// 处理请求体中的buffer格式参数
app.use(express.raw());

// 处理cookie，结果放置res.cookies中
app.use(cookieParser());

// 验证token
app.use(tokenMiddleware);

app.use("/api/login", loginRouter);
app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);

// 错误处理
app.use(errorMiddleware);

const port = 9527;
app.listen(port, () => {
  console.log("serve listen 9527");
});
