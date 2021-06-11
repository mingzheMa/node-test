const util = require("util");

module.exports = function (err, req, res, next) {
  if (util.types.isNativeError(err)) {
    res.send({
      code: 500,
      msg: err.message
    });
  } else {
    res.send(msg);
  }
};
