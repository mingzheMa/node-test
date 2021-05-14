const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files/test");

async function test() {
  try {
    await fs.promises.mkdir(filePath);
    console.log("success");
  } catch (error) {
    //   如果已经有该目录则会报错
    console.log(error);
  }
}

test();
