const { pathToRegexp } = require("path-to-regexp");

const errorUtil = require("../../utils/error");
const { decrypt } = require("../../utils/crypto");
const jwtUtil = require("../../utils/jwt");

// 不需要验证名单
const notAuthList = [
  { method: "POST", path: "/api/auth/login" },
  { method: "POST", path: "/api/auth/register" },
  { method: "GET", path: "/api/file/download/:filename" }
];

module.exports = function (req, res, next) {
  // 判断是否不需要验证
  const inList = notAuthList.some(
    w => w.method === req.method && pathToRegexp(w.path).test(req.path)
  );

  if (inList) {
    next();
    return;
  }

  // cookie验证方法
  // const token = req.headers.authorization || req.cookies.token;
  // if (token) {
  //   // 校验token
  //   const userId = decrypt(token);
  //   console.log("userId",userId);
  //   next();
  // } else {
  //   next(errorUtil[0001]);
  // }

  // session验证方法
  // if (req.session.user) {
  //   // 校验token
  //   console.log("login user", req.session.user);
  //   next();
  // } else {
  //   next(errorUtil[0001]);
  // }

  // jwt验证方法
  const token = req.headers.authorization || req.cookies.token;
  if (token) {
    const tokenArr = token.split(" ");
    const newToken = tokenArr.length === 2 ? tokenArr[1] : tokenArr[0];

    try {
      const info = jwtUtil.token2Val(newToken);
      req._jwt = info;
      next();
    } catch {
      next(errorUtil[0001]);
    }
    return;
  }

  next(errorUtil[0001]);
};
