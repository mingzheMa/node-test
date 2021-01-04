/*
 * @Author: marx
 * @Date: 2020-08-14 17:16:29
 * @LastEditTime: 2020-08-17 16:07:40
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/sequelize/modules/Book.js
 */
import { DataTypes } from "sequelize";
import library from "./db";

const Book = library.define(
  "Book",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sort: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    paranoid: true
  }
);

export default Book;
