const express = require("express");
const path = require("path");

const errorMiddleware = require("./middleware/error");
const adminRouter = require("../api/admin");


const app = express();

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


app.use("/api/admin",adminRouter)

app.use(errorMiddleware);

const port = 9527;
app.listen(port, () => {
  console.log("serve listen 9527");
});
