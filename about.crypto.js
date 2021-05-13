// 加密模块
const crypto = require("crypto");

const hmac = crypto.createHmac("sha256", "需要加密的东西");

// digest(编码)
console.log(hmac.digest("hex"));

// hmac.update("修改需要加密的东西")
// console.log(hmac.digest("hex"));

// 注意，hmac为可读写的流，读取后失效