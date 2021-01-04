/*
 * @Author: marx
 * @Date: 2020-08-14 17:03:41
 * @LastEditTime: 2020-08-17 13:36:04
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/sequelize/modules/db.js
 */
import { Sequelize } from "sequelize";

const library = new Sequelize("library", "root", "return0412", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

export default library;
