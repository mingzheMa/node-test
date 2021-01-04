/*
 * @Author: marx
 * @Date: 2020-08-14 17:16:29
 * @LastEditTime: 2020-08-21 18:13:49
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/sequelize/modules/User.js
 */
import { DataTypes } from "sequelize";
import library from "./db";

import { isHasRole } from "../utils/user";
import { err_message } from "../shared/message";

import md5 from "md5";

const User = library.define(
  "User",
  {
    nick_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    real_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        this.setDataValue("password", md5(password));
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(2160),
      defaultValue:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-cec1c297f1c143fa13fb57cc1ea7b0a0_hd.jpg%3Fsource%3D1940ef5c&imgrefurl=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F330764094&tbnid=zTPTEQoLbUZ4bM&vet=12ahUKEwi4x9zM9qHrAhVkJqYKHeOjDBYQMygBegUIARCtAQ..i&docid=VbAoWoTXn5BnrM&w=600&h=600&q=jojo%E5%A4%B4%E5%83%8F&ved=2ahUKEwi4x9zM9qHrAhVkJqYKHeOjDBYQMygBegUIARCtAQ"
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      set(role) {
        if (isHasRole(role)) {
          this.setDataValue("role", role);
        } else {
          throw new Error(err_message["notHasRole"]);
        }
      }
    }
  },
  {
    paranoid: true
  }
);

export default User;
