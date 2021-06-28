const log4js = require("log4js");

exports.logger = log4js.getLogger();
exports.sqlLogger = log4js.getLogger("sql");
exports.reqLogger = log4js.getLogger("req");
