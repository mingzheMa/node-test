const { URL } = require("url");

module.exports = function (req, res, next) {
  const { referer, host } = req.headers;
  if (referer && host) {
    const refererHost = new URL(req.headers.referer).host;
    if (refererHost !== host) {
      // 重写url，在路由匹配的基础上寻找zhangxueyou.jpg路径
      req.url = "/../anti-theft-img/zhangxueyou.jpg"; // url rewrite
    }
  }
  next();
};
