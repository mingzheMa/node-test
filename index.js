// Buffer
// console.log(Buffer.from("buffer"))

// __dirname
// 当前文件路径
// console.log(__dirname)

// __filename
// 当前文件路径/文件名
// console.log(__filename)

// console
// 不解释

// exports
// 导出对象，是module.exports的快捷方式
// console.log(exports)
// console.log(exports === module.exports)

// global
// 全局对象上的global就是全局对象
// console.log(global)
// console.log(global === global.global)

// module
// 导出对象，上面记录了一些当前模块信息，父模块信息，以及node_modules查找路径
// console.log(module)

// process
// 进程对象
// console.log(process)

// process exit()
// 进程退出，触发后node进程终止
// setTimeout(() => {
//   console.log("setTimeout");
// });
// process.exit();

// process argv
// 命令行参数，例如运行下node ./ a b c d 试试
// console.log(process.argv)

// process cwd()
// 返回node进程当前工作目录（绝对路径）
// console.log(process.cwd())

// process env
// 环境对象
// console.log(process.env)

// process kill()
// 杀掉进程，一下传入的为PID，在活动监视器里可以找到目前活动进程，可以试图杀掉
// process.kill(56254)

// process pid
// 当前进程PID
// process.kill(process.pid)


