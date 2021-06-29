const util = require("util");

module.exports = function (err, req, res, next) {
  if (util.types.isNativeError(err)) {
    res.status(500).send(err.message);
  } else {
    res
      .status(err.code || 400)
      .send(err.message ? err : { code: 400, message: err });
  }

  next();
};
