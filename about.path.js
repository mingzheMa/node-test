// 路径
const path = require("path");

// 返回最后一个路径
// console.log(path.basename("/a/b/c/d.eee")); // d.eee
// console.log(path.basename("/a/b/c/d.eee", ".eee")); // d
// console.log(path.basename("/a/b/c/d.eee", ".fff")); // d.eee

// 返回系统路径界定符
// console.log(path.delimiter)

// 返回除最后一个路径
// console.log(path.dirname("a/b/c/d.eee")) // a/b/c

// 返回文件扩展名
// console.log(path.extname("d.eee"))  // .eee
// console.log(path.extname("a/b/c/d.eee")) // .eee
// console.log(path.extname("d")) // 空

// 拼出url路径
// 如果提供了 pathObject.dir，则忽略 pathObject.root。
// 如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。
// console.log(
//   path.format({
//     dir: "a",
//     root: "b",
//     base: "c",
//     name: "d",
//     ext: "e"
//   })
// );

// 解析url路径
// 结果为format传入参数格式一致
// console.log(path.parse("/a/b/c/d.eee"));

// 拼出路径
// console.log(path.join("a", "b", "c", "d.eee"));

// 解析路径
// console.log(path.normalize("a/b/c/d/../../..")) // a

// 返回从from 到 to 的路径
// console.log(path.relative("/a/b/c/d", "/a/e/f/g")); // ../../../e/f/g

// 路径分割符 / 或 \
// console.log(path.sep);
