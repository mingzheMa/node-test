const crypto = require("crypto");

// 128秘钥
const secret = Buffer.from("1234567890123456");
// iv随机向量
const iv = Buffer.from("1234567890123456");

// 加密
exports.encrypt = str => {
  const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
  let encrypted = cry.update(str, "utf8", "hex");
  encrypted += cry.final("hex");
  return encrypted;
};

// 解密
exports.decrypt = str => {
  const cry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
  let decrypted = cry.update(str, "hex", "utf8");
  decrypted += cry.final("utf8");
  return decrypted;
};
