const http = require("http");
const path = require("path");
const URL = require("url").URL;
const fs = require("fs");

const server = http.createServer();

server.listen(9527, () => {
  console.log("server listen 9527");
});

async function isStat(path) {
  try {
    return await fs.promises.stat(path);
  } catch (error) {
    return null;
  }
}

async function getFileStream(reqPath) {
  const filePath = path.resolve(__dirname, "./public", reqPath.substr(1));
  const stat = await isStat(filePath);
  if (!stat) {
    return null;
  } else if (stat.isDirectory()) {
    return await getFileStream(`${reqPath.substr(1)}/index.html`);
  } else if (stat.isFile()) {
    return fs.createReadStream(filePath);
    // return await fs.promises.readFile(filePath, {
    //   encoding: "utf-8"
    // });
  }
}

server.on("request", async (req, res) => {
  const urlObj = new URL(req.url, "http://localhost:9527");
  const fileStream = await getFileStream(urlObj.pathname);
  if (fileStream) {
    let data = "";
    fileStream.on("data", chunk => {
      data += chunk;
    });

    fileStream.on("end", () => {
      res.write(data);
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.statusMessage = "error! error!";
    res.write("not fund");
    res.end();
  }
});
