const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files/test.txt");

async function copyFile(orginPath, targetPath) {
  if (!orginPath) {
    console.dir("orginPath is not find");
    return;
  }

  const file = await fs.promises.readFile(orginPath, "utf-8");
  const fileParse = path.parse(orginPath);

  if (!targetPath) {
    targetPath = `${fileParse.dir}/${fileParse.name} copy${fileParse.ext}`;
  }

  return await fs.promises.writeFile(targetPath, file);
}

// copyFile(filePath, path.resolve(__dirname, "./files/test.copy.txt"));
copyFile(filePath);
