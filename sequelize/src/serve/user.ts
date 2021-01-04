/*
 * @Author: marx
 * @Date: 2020-08-17 13:49:10
 * @LastEditTime: 2020-08-24 10:47:13
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/sequelize/serve/user.js
 */
import User from "../modules/User";

import { isSuperAdministrator } from "../utils/user";
import { err_message } from "../shared/message";

// 添加一个用户
async function addUser(userInfo) {
  return await User.create(userInfo);
}

// 删除一个用户
async function delUser(userId) {
  return await User.destroy({ where: { id: userId } });
}

// 修改一个用户
async function editUser(userId, userInfo) {
  return await User.update(userInfo, { where: { id: userId } });
}

// 获取一个用户
async function seekOneUser(userId) {
  const info = await User.findByPk(userId);
  return info && info.toJSON();
}

// 分页获取用户
async function seekAllUser(page = 1, pageSize = 10) {
  const res = await User.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize
  });
  return {
    count: res.count,
    rows: res.rows.map((row) => row.toJSON())
  };
}

// 添加一个管理员
async function addAdministrators(userInfo, executorId) {
  try {
    await isSuperAdministratorFn(executorId);
    return await User.create({ ...userInfo, role: "administrator" });
  } catch (error) {
    return Promise.reject(error);
  }
}

// 删除一个管理员
async function delAdministrators(userId, executorId) {
  try {
    await isSuperAdministratorFn(executorId);
    return await User.destroy({ where: { id: userId, role: "administrator" } });
  } catch (error) {
    return Promise.reject(error);
  }
}

// 修改一个管理员
async function editAdministrators(userId, userInfo, executorId) {
  try {
    await isSuperAdministratorFn(executorId);
    return await User.update(userInfo, {
      where: { id: userId, role: "administrator" }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  addUser,
  delUser,
  editUser,
  seekOneUser,
  seekAllUser,
  addAdministrators,
  delAdministrators,
  editAdministrators
};

async function isSuperAdministratorFn(id) {
  if (!(await isSuperAdministrator(id)))
    return Promise.reject(err_message["notSuperAdministrators"]);
}
