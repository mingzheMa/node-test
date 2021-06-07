const Book = require("../modules/Book");

// 增
exports.create = async bookObj => {
  const ins = await Book.create(bookObj);
  return ins.toJSON();
};

// 删
exports.destroy = async bookId => {
  return await Book.destroy({
    where: {
      id: bookId
    },
    limit: 1
  });
};

// 改
exports.update = async (bookObj, bookId) => {
  return await Book.update(bookObj, {
    where: {
      id: bookId
    },
    limit: 1
  });
};

// 查（按分页）
exports.findAndCountAll = async (page, limit) => {
  const ins = await Book.findAndCountAll({
    limit,
    offset: (page - 1) * limit
  });

  return {
    page,
    count: ins.count,
    rows: ins.rows.map(r => r.toJSON())
  };
};

// 查（按id）
exports.findByPk = async bookId => {
  const ins = await Book.findByPk(bookId);
  return ins && ins.toJSON();
};
