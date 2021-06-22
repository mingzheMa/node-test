const Student = require("../modules/Student");
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
  birth_date: {
    type: "string",
    presence: {
      allowEmpty: false
    }
  },
  sex: {
    type: "boolean",
    presence: true
  },
  mobile: {
    type: "string",
    length: {
      is: 11
    },
    presence: {
      allowEmpty: false
    }
  },
  class_id: {
    type: "number",
    presence: true
  }
};

async function hasStudent(studentId) {
  const has = await Student.findByPk(studentId);

  if (!has) throw error[4003];
}

async function hasClass(classId) {
  const has = await Class.findByPk(classId);

  if (!has) throw error[3003];
}

// 增
exports.create = async studentObj => {
  await validate.async(studentObj, tableRules);
  await hasClass(studentObj.class_id);
  const ins = await Student.create(studentObj);
  return ins.toJSON();
};

// 删
exports.destroy = async studentId => {
  await hasStudent(studentId);
  return await Student.destroy({
    where: {
      id: studentId
    },
    limit: 1
  });
};

// 改
exports.update = async (studentObj, studentId) => {
  await validate.async(studentObj, tableRules);
  await hasStudent(studentId);
  return await Student.update(studentObj, {
    where: {
      id: studentId
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
  const ins = await Student.findAndCountAll({
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
exports.findByPk = async studentId => {
  const ins = await Student.findByPk(studentId);
  return ins && ins.toJSON();
};
