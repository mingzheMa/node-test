async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout0");
}, 0);

setTimeout(function () {
  console.log("setTimeout3");
}, 3);

setImmediate(() => console.log("setImmediate"));

process.nextTick(() => console.log("nextTick"));

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(function () {
  console.log("promise3");
});

console.log("script end");

// 输出结果
// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nextTick
// async1 end
// promise3
// setTimeout0
// setTimeout3
// setImmediate

// 时间点
// 1.主线程执行完毕
// nextTick：
// nextTick

// promise：
// async1 end
// promise3

// timers：
// setTimeout0
// setTimeout3

// check：
// setImmediate

// 控制台输出
// script start
// async1 start
// async2
// promise1
// promise2
// script end

// 2.执行nextTick和promise队列
// nextTick：

// promise：

// timers：
// setTimeout0
// setTimeout3

// check：
// setImmediate

// 控制台输出
// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nextTick
// async1 end
// promise3

// 3.轮询剩余队列
// nextTick：

// promise：

// timers：

// check：

// 控制台输出
// 这里事实上是有争议的，如果在执行完promise队列后计算机用时不超过1毫秒则
// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nextTick
// async1 end
// promise3
// setImmediate
// setTimeout0
// setTimeout3

// 如果在执行完promise队列后计算机用时超过1毫秒不超过3毫秒则
// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nextTick
// async1 end
// promise3
// setTimeout0
// setImmediate
// setTimeout3

// 如果在执行完promise队列后计算机用时超过3毫秒则
// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nextTick
// async1 end
// promise3
// setTimeout0
// setTimeout3
// setImmediate