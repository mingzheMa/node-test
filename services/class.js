const Class = require("../modules/Class");

// 增
exports.create = async classObj => {
  const ins = await Class.create(classObj);
  return ins.toJSON();
};

// 删
exports.destroy = async classId => {
  return await Class.destroy({
    where: {
      id: classId
    },
    limit: 1
  });
};

// 改
exports.update = async (classObj, classId) => {
  return await Class.update(classObj, {
    where: {
      id: classId
    },
    limit: 1
  });
};

// 查（按分页）
exports.findAndCountAll = async (page, limit) => {
  const ins = await Class.findAndCountAll({
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
exports.findByPk = async classId => {
  const ins = await Class.findByPk(classId);
  return ins && ins.toJSON();
};
