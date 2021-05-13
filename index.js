// 导入分析
// function require(path) {
//   // 1.通过路径读出文件内容

//   function myModule(module, exports) {
//     // 2.导出文件放入函数执行
//     exports.a = 1;
//     module.exports = {
//       b: 2,
//       c: 3
//     };
//     this.d = 4;
//   }

//   const exports = module.exports;
//   module.exports = myModule(module.exports, module.exports, exports);

//   // 3.返回module.exports对象
//   return module.exports;
// }

const test = require("./test");
console.log(test);

// require方法上的属性

// cache
// 被引入过的模块缓存
// console.log(require.cache)

// main
// 启动进程的入口文件信息
// console.log(require.main)

