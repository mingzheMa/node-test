const Class = require("../modules/Class");
const selectFilterWhere = require("../utils/selectFilterWhere");
const selectFilterOrder = require("../utils/selectFilterOrder");
const validate = require("validate.js");
const error = require("../utils/error");

const tableRules = {
  name: {
    type: "string",
    presence: {
      allowEmpty: false
    }
  },
  created_date: {
    type: "string",
    presence: {
      allowEmpty: false
    }
  }
};

// 检查是否存在班级
async function hasClass(classId) {
  const has = await Class.findByPk(classId);
  if (!has) throw error[3003];
}

// 增
exports.create = async classObj => {
  await validate.async(classObj, tableRules);
  const ins = await Class.create(classObj);
  return ins.toJSON();
};

// 删
exports.destroy = async classId => {
  await hasClass(classId);

  return await Class.destroy({
    where: {
      id: classId
    },
    limit: 1
  });
};

// 改
exports.update = async (classObj, classId) => {
  await validate.async(classObj, tableRules);

  await hasClass(classId);

  return await Class.update(classObj, {
    where: {
      id: classId
    },
    limit: 1
  });
};

// 查（按分页）
exports.findAndCountAll = async ({
  page = 1,
  limit = 10,
  order = "",
  ...filterForm
}) => {
  const where = selectFilterWhere(filterForm);
  const newOrder = selectFilterOrder(order);
  const ins = await Class.findAndCountAll({
    where,
    order: newOrder,
    limit: +limit,
    offset: (page - 1) * limit
  });

  return {
    page: +page,
    limit: +limit,
    count: ins.count,
    rows: ins.rows.map(r => r.toJSON())
  };
};

// 查（按id）
exports.findByPk = async classId => {
  const ins = await Class.findByPk(classId);
  return ins && ins.toJSON();
};
