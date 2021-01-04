/*
 * @Author: marx
 * @Date: 2020-08-14 17:16:29
 * @LastEditTime: 2020-08-17 16:53:09
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/sequelize/modules/Borrow.js
 */
import { DataTypes } from "sequelize";
import library from "./db";

import Book from "./Book";
import User from "./User";

const Borrow = library.define(
  "Borrow",
  {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      }
    },
    BookId: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: "id"
      }
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expect_return_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    return_date: {
      type: DataTypes.DATE
    }
  },
  {
    paranoid: true
  }
);

export default Borrow;
