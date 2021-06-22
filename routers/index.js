const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");
const tokenMiddleware = require("./middleware/token");

const loginRouter = require("../api/login");
const adminRouter = require("../api/admin");
const studentRouter = require("../api/student");

const app = express();

// jsonp跨域处理
// 局限性：由于script只能发送get请求所以，其他请求方式不适用
app.get("/api/jsonp", (req, res) => {
  res.set("Content-Type","application/javascript")
  res.send("callback('jsonpdata...')")
});

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
