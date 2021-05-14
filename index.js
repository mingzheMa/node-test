const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files");

class File {
  constructor({ name, size, isFile, path, atime, ctime, birthtime, children }) {
    this.name = name;
    this.size = size;
    this.isFile = isFile;
    this.path = path;
    this.atime = atime;
    this.ctime = ctime;
    this.birthtime = birthtime;
    this.children = children;
  }

  static async creatFile(filePath) {
    if (!path.isAbsolute(filePath)) {
      console.dir("path not is a absolute");
      return null;
    }

    const stat = await fs.promises.stat(filePath);
    const basename = path.basename(filePath);

    return new File({
      name: basename,
      size: stat.size,
      isFile: stat.isFile(),
      path: filePath,
      atime: stat.atime,
      ctime: stat.ctime,
      birthtime: stat.birthtime,
      children: []
    });
  }
}

async function getFileTree(filePath) {
  // 判断文件是否存在
  const isFile = await fs.existsSync(filePath);
  if (!isFile) {
    console.dir("file is not find");
    return;
  }

  // 判断文件是否为文件，也可能是目录
  const stat = await fs.promises.stat(filePath);
  if (stat.isFile()) {
    // 如果为文件
    return await File.creatFile(filePath);
  } else if (stat.isDirectory()) {
    // 如果为目录
    const file = await File.creatFile(filePath);
    const dirs = await fs.promises.readdir(filePath);

    // 创建children
    file.children = await Promise.all(
      dirs.map(p => getFileTree(`${filePath}/${p}`))
    );

    return file;
  }
}

async function creatFileTree(filePath) {
  return await getFileTree(filePath);
}

creatFileTree(filePath).then(res => {
  console.log(res);
});
