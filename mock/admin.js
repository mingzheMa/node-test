const { Random } = require("mockjs");
const Admin = require("../modules/Admin");

function randomObj() {
  return {
    user_name: Random.ctitle(2, 6),
    password: Random.integer(100000, 999999),
    nick_name: Random.cname()
  };
}

const datas = new Array(10).fill("").map(() => randomObj());

Admin.bulkCreate(datas);
