const md5 = require("md5");
const validate = require("validate.js");

const Admin = require("../modules/Admin");
const selectFilterWhere = require("../utils/selectFilterWhere");
const selectFilterOrder = require("../utils/selectFilterOrder");
const error = require("../utils/error");

// 表字段校验
const tableRules = {
  user_name: {
    type: "string",
    length: {
      minimum: 2,
      maximum: 16
    },
    presence: {
      allowEmpty: false
    }
  },
  password: {
    type: "string",
    presence: {
      allowEmpty: false
    }
  },
  nick_name: {
    type: "string",
    length: {
      minimum: 2
    },
    presence: {
      allowEmpty: false
    }
  }
};

// 通过创建对象实例添加，创建出的对象实例在调用save前可以修改实例上的属性，并使用save保存
// exports.create = async adminObj => {
//   const ins = await Admin.build(adminObj);
//   return await ins.save();
// };

// 通过模型实例增，删，改，查
// 增
exports.create = async adminObj => {
  await validate.async(adminObj, tableRules);

  // 查看用户是否存在
  const hasAdmin = await Admin.findOne({
    attributes: ["id"],
    where: {
      user_name: adminObj.user_name
    }
  });

  if (hasAdmin) {
    return Promise.reject(error[1001]);
  } else {
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
  }
};

// 删
exports.destroy = async adminId => {
  // 查看用户是否存在
  const hasAdmin = await Admin.findByPk(adminId);

  if (hasAdmin) {
    return await Admin.destroy({
      where: {
        id: adminId
      },
      limit: 1
    });
  } else {
    return Promise.reject(error[1003]);
  }
};

// 改
exports.update = async (adminId, adminObj) => {
  await validate.async(adminObj, tableRules);

  // 查看用户是否存在
  const hasAdmin = await Admin.findByPk(adminId);

  if (hasAdmin) {
    return await Admin.update(adminObj, {
      where: {
        id: adminId
      },
      limit: 1
    });
  } else {
    return Promise.reject(error[1003]);
  }
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
  const ins = await Admin.findAndCountAll({
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
exports.findByPk = async adminId => {
  const ins = await Admin.findByPk(adminId);
  return ins && ins.toJSON();
};

// 登录
exports.login = async ({ user_name, password }) => {
  await validate.async(
    {
      user_name,
      password
    },
    {
      user_name: tableRules.user_name,
      password: tableRules.password
    }
  );

  const userInfo = await Admin.findOne({
    where: {
      user_name,
      password: md5(password)
    }
  });

  return userInfo || Promise.reject(error[1002]);
};
