function cb(msg) {
  return function () {
    console.log(msg);
  };
}

setTimeout(cb("setTimeout"), 1000);
setImmediate(cb("setImmediate"));
process.nextTick(cb("process.nextTick"));
cb("Main process")();

// Main process
// process.nextTick
// setImmediate
// setTimeout