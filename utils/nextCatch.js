module.exports = fn => {
  return (...args) => fn(...args).catch(args[2]);
};
