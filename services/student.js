const Student = require("../modules/Student");

// 增
exports.create = async studentObj => {
  const ins = await Student.create(studentObj);
  return ins.toJSON();
};

// 删
exports.destroy = async studentId => {
  return await Student.destroy({
    where: {
      id: studentId
    },
    limit: 1
  });
};

// 改
exports.update = async (studentObj, studentId) => {
  return await Student.update(studentObj, {
    where: {
      id: studentId
    },
    limit: 1
  });
};

// 查（按分页）
exports.findAndCountAll = async (page, limit) => {
  const ins = await Student.findAndCountAll({
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
exports.findByPk = async studentId => {
  const ins = await Student.findByPk(studentId);
  return ins && ins.toJSON();
};
