const fs = require("fs");
const path = require("path");

const orginfilePath = path.resolve(__dirname, "./files/test.txt");
const targetFilePath = path.resolve(__dirname, "./files/test.copyFile.txt");

fs.promises.copyFile(orginfilePath, targetFilePath);
