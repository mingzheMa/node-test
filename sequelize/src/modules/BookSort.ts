/*
 * @Author: marx
 * @Date: 2020-08-14 17:16:29
 * @LastEditTime: 2020-08-17 16:09:42
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/sequelize/modules/BookSort.js
 */
import { DataTypes } from "sequelize";
import library from "./db";

const BookSort = library.define(
  "BookSort",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    paranoid: true
  }
);

export default BookSort;
