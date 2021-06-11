const express = require("express");
const errorMiddleware = require("./middleware/error");
const app = express();
const port = 9527;

// 如果处理返回则返回404
// app.get(
//   "*",
//   (req, res, next) => {
//     console.log("middleware 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 3");
//     next();
//   }
// );

// 在中间件中处理响应
// app.get(
//   "*",
//   (req, res, next) => {
//     console.log("middleware 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 3");
//     res.send("middleware 3");
//     next();
//   }
// );

// 在某个中间件中处理响应后并不影响后续中间件执行
// app.get(
//   "*",
//   (req, res, next) => {
//     console.log("middleware 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 2");
//     res.send("middleware 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 3");
//     next();
//   }
// );

// 响应send只能处理一次，多次处理会报错
// status后续处理并不会生效
// app.get(
//   "*",
//   (req, res, next) => {
//     console.log("middleware 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 2");
//     res.send("middleware 2");
//     res.status(400);
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 3");
//     res.send("middleware 3");
//     res.status(401);
//     next();
//   }
// );

// 某个中间件发生错误不会导致服务器关闭
// 但是后续中间件不执行
// app.get(
//   "*",
//   (req, res, next) => {
//     console.log("middleware 1");
//     // throw new Error("error!");
//     next(new Error("error!"));
//   },
//   (req, res, next) => {
//     console.log("middleware 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("middleware 3");
//     next();
//   }
// );

// 错误处理中间件
// app.get(
//   "*",
//   (req, res, next) => {
//     console.log("middleware");
//     next(new Error("error"));
//   },
//   (err, req, res, next) => {
//     res.send({
//       code: 500,
//       msg: err.message
//     });
//   }
// );

app.get("*", (req, res, next) => {
  console.log("middleware");
  next(new Error("error"));
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("serve listen 9527");
});
