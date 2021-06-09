const { Op } = require("sequelize");

module.exports = function (filterForm) {
  return Object.keys(filterForm).reduce((curr, next) => {
    curr[next] = {
      [Op.like]: `%${filterForm[next]}%`
    };
    return curr
  }, {});
};
