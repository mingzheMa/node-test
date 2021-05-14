const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files");

async function test() {
  const dirs = await fs.promises.readdir(filePath);
  console.log(dirs)
}

test();
