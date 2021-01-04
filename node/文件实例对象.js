/*
 * @Author: marx
 * @Date: 2020-07-30 15:09:45
 * @LastEditTime: 2020-08-04 10:24:35
 * @Description: 组件描述
 * @FilePath: /robo-advisor/Users/marx/Desktop/node/src/index.js
 */
// {
//     文件名,
//     绝对路径,
//     后缀名,
//     是文件,
//     文件大小,
//     创建时间,
//     修改时间,

//     获取子文件,
//     读文件,
// }
const fs = require("fs");
const path = require("path");
const target = path.resolve("./view/test.js");

class File {
  constructor(name, path, suffix, isFile, size, creatDate, editDate) {
    this.name = name;
    this.path = path;
    this.suffix = suffix;
    this.isFile = isFile;
    this.size = size;
    this.creatDate = creatDate;
    this.editDate = editDate;
  }

  static getFile(targetPath) {
    const stat = fs.statSync(targetPath);
    const name = path.basename(targetPath);
    const suffix = path.extname(targetPath);
    const isFile = stat.isFile();
    const size = stat.size;
    const creatDate = stat.ctime;
    const editDate = stat.mtime;

    return new File(
      name,
      targetPath,
      suffix,
      isFile,
      size,
      creatDate,
      editDate
    );
  }

  async getChildren() {
    if (this.isFile) return null;

    const list = await fs.promises.readdir(this.path);
    return list.map((name) => {
      const filePath = path.join(this.path, name);
      const file = File.getFile(filePath);
      return file;
    });
  }

  async getContent(buffer = false) {
    if (!this.isFile) throw "这不是一个文件";

    let fileContent;

    if (buffer) {
      fileContent = fs.promises.readFile(this.path);
    } else {
      fileContent = fs.promises.readFile(this.path, "utf-8");
    }

    return fileContent;
  }
}

async function test() {
  const file = File.getFile(target);
  const children = await file.getChildren();
  const content = await file.getContent();
  console.log(content);
}
test();
