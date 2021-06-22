const { pathToRegexp } = require("path-to-regexp");

const error = require("../../utils/error");
const { decrypt } = require("../../utils/crypto");

// 不需要验证名单
const notAuthList = [{ method: "POST", path: "/api/login" }];

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
  //   next(error[0001]);
  // }

  // session验证方法
  if (req.session.user) {
    // 校验token
    console.log("login user", req.session.user);
    next();
  } else {
    next(error[0001]);
  }
};
