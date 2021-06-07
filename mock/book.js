const { Random } = require("mockjs");
const Book = require("../modules/Book");

function randomObj() {
  return {
    name: Random.ctitle(2, 10),
    img: Random.image("240x400"),
    publication_date: Random.date("yyyy-MM-dd HH:mm:ss"),
    author: Random.boolean(2, 1) ? Random.cname() : Random.name()
  };
}

const datas = new Array(10).fill("").map(() => randomObj());

Book.bulkCreate(datas);
