const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const history = require("connect-history-api-fallback");

const errorMiddleware = require("./middleware/error");
const tokenMiddleware = require("./middleware/token");
const requireLogMiddleware = require("./middleware/requireLog");

const authRouter = require("../api/auth");
const adminRouter = require("../api/admin");
const studentRouter = require("../api/student");
const fileRouter = require("../api/file");

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
app.use(cors());

// 将content-type为text/html的请求视为页面请求
app.use(history());

// 静态资源中间件
app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use("/public", express.static(path.resolve(__dirname, "../public")));

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

// session处理中间件
// app.use(
//   session({
//     cookie: {
//       path: "/",
//       maxAge: 86400
//     },
//     name: "token",
//     secret: "key"
//   })
// );

// 请求日志记录中间件
app.use(requireLogMiddleware);

// 验证token
app.use(tokenMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);
app.use("/api/file", fileRouter);

// 错误处理
app.use(errorMiddleware);

const port = 9527;
app.listen(port, () => {
  console.log("serve listen 9527");
});
