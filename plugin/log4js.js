const log4js = require("log4js");
const path = require("path");

function getDateFileConfig(type) {
  return {
    appenders: [type],
    type: "dateFile",
    filename: path.resolve(__dirname, `../logs/${type}/${type}.log`),
    maxLogSize: 1024 * 1024,
    keepFileExt: true,
    layout: {
      type: "pattern",
      pattern: `[%d{yyyy-MM-dd hh:mm:ss}][%p][%c]: %m`
    }
  };
}

const appenders = {
  default: { type: "stdout", appenders: ["default"] },
  sql: getDateFileConfig("sql"),
  req: getDateFileConfig("req")
};

const categories = {
  default: { appenders: ["default"], level: "debug" },
  sql: { appenders: ["sql"], level: "all" },
  req: { appenders: ["req"], level: "all" }
};

log4js.configure({
  appenders,
  categories
});

// 服务关闭时记录log
process.on("exit", () => {
  log4js.shutdown();
});
