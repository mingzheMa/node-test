const jwt = require("jsonwebtoken");
const secret = "hellow word!";

exports.val2Token = (val, expiresIn = "1d") =>
  jwt.sign(val, secret, {
    expiresIn
  });

exports.token2Val = token => jwt.verify(token, secret);
