const { Random } = require("mockjs");
const Student = require("../modules/Student");

function randomObj() {
  return {
    name: Random.boolean(2, 1) ? Random.cname() : Random.name(),
    birth_date: Random.date("yyyy-MM-dd HH:mm:ss"),
    sex: Random.boolean(),
    mobile: Random.integer(13000000000, 18999999999),
    class_id: Random.integer(1, 6)
  };
}

const datas = new Array(10).fill("").map(() => randomObj());

Student.bulkCreate(datas);
