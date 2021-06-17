module.exports = function (order) {
  const reg = /^-/;
  
  if (!order) {
    return []
  } else if (reg.test(order)) {
    const key = order.replace("-", "");
    return [[key, "DESC"]];
  } else {
    return [[order, "ASC"]];
  }
};
