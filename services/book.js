const Book = require("../modules/Book");
const selectFilterWhere = require("../utils/selectFilterWhere");
const validate = require("validate.js");
const error = require("../utils/error");

const tableRules = {
  name: {
    type: "string",
    presence: {
      allowEmpty: false
    }
  },
  img: {
    type: "string",
    presence: {
      allowEmpty: false
    }
  },
  publication_date: {
    type: "string",
    presence: {
      allowEmpty: false
    }
  },
  author: {
    type: "string",
    length: {
      minimum: 1,
      maximum: 16
    },
    presence: {
      allowEmpty: false
    }
  }
};

// 判断书籍是否存在
async function bookHas(bookId) {
  const has = await Book.findByPk(bookId);

  if (!has) {
    throw error[2003];
  }
}

// 增
exports.create = async bookObj => {
  await validate.async(bookObj, tableRules);
  const ins = await Book.create(bookObj);
  return ins.toJSON();
};

// 删
exports.destroy = async bookId => {
  await bookHas(bookId);

  return await Book.destroy({
    where: {
      id: bookId
    },
    limit: 1
  });
};

// 改
exports.update = async (bookObj, bookId) => {
  await validate.async(bookObj, tableRules);

  await bookHas(bookId);

  return await Book.update(bookObj, {
    where: {
      id: bookId
    },
    limit: 1
  });
};

// 查（按分页）
exports.findAndCountAll = async (page, limit, filterForm = {}) => {
  const where = selectFilterWhere(filterForm);

  const ins = await Book.findAndCountAll({
    where,
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
