// 运行代码，事件循环阻塞在nextTick队列，check队列不会执行
// function test() {
//   return process.nextTick(() => test());
// }

// test();

// setImmediate(() => {
//   console.log('setImmediate');
// })


// setTimeout(0)事实上大概为1毫秒左右执行
// 如果执行到timers队列时间小于1毫秒则先输出setImmediate，在无限回调
// 如果执行到timers队列时间大于1毫秒这先执行一次test，在输出setImmediate，在无限回调
function test() {
  setTimeout(() => test(), 0);
}

test();

setImmediate(() => {
  console.log("setImmediate");
});
