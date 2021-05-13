// 使用方法，均可以得到{a:1}的导出结果
// exports.a = 1;

// module.exports.a = 1

// module.exports = {
//   a: 1
// };

// this.a = 1

// exports、module.exports、this三者为用一个对象
// console.log(exports);
// console.log(module.exports);
// console.log(this);
// console.log(exports === module.exports);
// console.log(exports === this);
// console.log(module.exports === this);

exports.a = 1;
module.exports = {
  b: 2,
  c: 3
};
this.d = 4;

// 导出为{ b:2, c:3 }
