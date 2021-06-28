// import log4js from "log4js";

const { reqLogger } = require("../../utils/log4js");

module.exports = function (req, res, next) {
  next();
  reqLogger.info(
    `${req.method} ${req.originalUrl} ${req.ip} ${JSON.stringify(req.body)}`
  );
};
