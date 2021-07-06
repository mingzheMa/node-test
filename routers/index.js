const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const history = require("connect-history-api-fallback");

const errorMiddleware = require("./middleware/error");
const tokenMiddleware = require("./middleware/token");
const requireLogMiddleware = require("./middleware/requireLog");
const antiTheftLinkMiddleware = require("./middleware/antiTheftLink");
const proxyMiddleware = require("./middleware/proxy.js");

const authRouter = require("../api/auth");
const adminRouter = require("../api/admin");
const studentRouter = require("../api/student");
const fileRouter = require("../api/file");
const ejsRouter = require("../api/ejs");
const captchaRouter = require("../api/captcha");

const chatSocketRouter = require("../api/socket/chart");

const app = express();
const http = require("http").createServer(app);

// 挂载websocket
chatSocketRouter(http);

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

// ejs
app.use("/ejs", ejsRouter);

// 将content-type为text/html的请求视为页面请求
app.use(
  history({
    htmlAcceptHeaders: ["text/html", "application/xhtml+xml"]
  })
);

// 静态资源中间件
// 首次请求静态页面，服务器响应响应头：
// Cache-Control: public, max-age=31536000 // public代表资源是公开的，max-age代表资源缓存时间为31536000秒
// Date: Mon, 05 Jul 2021 05:32:26 GMT // 请求返回的时间，用来计算缓存是否过期
// ETag: W/"40785-17a74c2030a" // 资源编号，如果服务器资源发生改变，则该资源编号也会随着改变，w/代表不区分大小写
// Last-Modified: Mon, 05 Jul 2021 03:41:49 GMT // 最后操作的时间

// 浏览器接收到响应：
//   如果响应头中有Cache-Control.max-age或者Last-Modified，则缓存
//   请求方法，请求路径，过期时间，接口返回时间，资源编号，最后操作时间
//   如果没有，则不缓存

// 浏览器后续请求时会先去缓存中找资源编号对应的资源
//   如果没有对应资源则发送请求(和首次请求一致)
//   如果有资源编号，找到该资源并查看是否过期
//     如果过期则发出请求询问服务器改请求是否可以使用缓存，服务器根据以下请求头判断资源是否改变
//     If-None-Match: W/"121-171ca289ebf" // 资源编号
//       如果资源改变，则返回200并附加请求体
//       如果资源未改变，则返回304并附加响应头(和首次请求的响应头一致)表示资源可以继续使用缓存
//     如果没有过期，则继续使用缓存中的资源

app.use(
  express.static(path.resolve(__dirname, "../client/dist"), {
    maxAge: 1000 * 3600 * 24 * 365 // 静态资源缓存一年，因为每次变动jscss资源的hash值都会变化，所以不用担心代码变动浏览器读取缓存
  })
);
// 图片防盗链
app.use("/public/img", antiTheftLinkMiddleware);
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

// session处理验证码
app.use(
  session({
    cookie: {
      path: "/",
      maxAge: 1000 * 60 * 60 // 五分钟
    },
    name: "captcha",
    secret: "siyao"
  })
);

// 验证码
app.use("/captcha", captchaRouter);

// 请求日志记录中间件
app.use(requireLogMiddleware);

// 验证token
app.use(tokenMiddleware);

// 代理
app.use("/data/api", proxyMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);
app.use("/api/file", fileRouter);

// 错误处理
app.use(errorMiddleware);

const port = 9527;
http.listen(port, () => {
  console.log("serve listen 9527");
});
