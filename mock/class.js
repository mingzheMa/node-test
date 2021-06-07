const { Random } = require("mockjs");
const Class = require("../modules/Class");

function randomObj(i) {
  return {
    name: `班级${i + 1}`,
    created_date: Random.date("yyyy-MM-dd HH:mm:ss")
  };
}

const datas = new Array(6).fill("").map((d, i) => randomObj(i));

Class.bulkCreate(datas);
