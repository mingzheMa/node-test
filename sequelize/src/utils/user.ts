/*
 * @Author: marx
 * @Date: 2020-08-17 14:20:16
 * @LastEditTime: 2020-08-21 18:11:55
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/sequelize/utils/user.js
 */
import User from "../modules/User";
const roles = ["student", "administrator", "super_administrator"];

// 判断一个用户是否为超级管理员
export async function isSuperAdministrator(userId) {
  const user = await User.findByPk(userId);
  if (user === null) return false;

  const info: object = user.toJSON();

  return info.role === "super_administrator";
}

// 判断一个用户是否为管理员
export async function isAdministrator(userId) {
  const user = await User.findByPk(userId);
  if (user === null) return false;

  const info = user.toJSON();
  return info.role === "administrator";
}

// 判断角色是否存在
export function isHasRole(role) {
  return roles.includes(role);
}
