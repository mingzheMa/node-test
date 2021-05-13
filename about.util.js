// 工具
const util = require("util");

// 异步函数转带回调函数
const delay = ms => new Promise(res => setTimeout(() => res(ms), ms));

// async function myFunc(ms) {
//   return await delay(ms);
// }

// const cbMyFunc = util.callbackify(myFunc);
// cbMyFunc(1000, (err, res) => {
//   console.log("over", res);
// });

// 带回调函数转异步函数
// function myFund(ms, cb) {
//   delay(ms)
//     .then(res => cb(undefined, res))
//     .catch(err => cb(err, undefined));
// }

// const asyncMyFund = util.promisify(myFund);

// (async () => {
//   const res = await asyncMyFund(1000);
//   console.log("over", res);
// })();
