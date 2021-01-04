/*
 * @Author: marx
 * @Date: 2020-08-17 13:50:29
 * @LastEditTime: 2020-08-24 16:15:20
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/sequelize/index.js
 */
// require("./modules/index");
// const User = require("./serve/user");

// User.seekAllUser().then((res) => {
//   console.log(res);
// });

// const FormRules = require("./validator/index");
import FormRules from "./src/validator";

const formRules = new FormRules();

formRules.add({
  type: "aaa",
  value: 123
});

formRules.check();

// console.log(formRules);
