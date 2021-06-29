const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const error = require("../../utils/error");

const router = express.Router();
const uploadImg = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, "../../public/img"));
    },
    filename(req, file, cb) {
      const extname = path.extname(file.originalname);
      cb(null, `${v4()}${extname}`);
    }
  }),
  // dest: path.resolve(__dirname, "../../public/img")
  fileFilter(req, file, cb) {
    const fileTypes = [".jpg", ".jpeg", ".pdf", ".png"];
    if (!fileTypes.includes(path.extname(file.originalname))) {
      cb(error[5002]);
    }

    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 //1M
  }
});

// 上传图片
// FormData 会带上一下两个请求头
// Content-Length: 4764 // 代表FormData大小
// Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryFqw3BEmtHRJskVJs // FormData格式，以及分隔符

// 请求体会获取请求头中的分隔符来分割请求体，获取formdata内容
// ------WebKitFormBoundaryFqw3BEmtHRJskVJs
// Content-Disposition: form-data; name="file"; filename="wuyanzu.jpeg"
// Content-Type: image/jpeg

// ------WebKitFormBoundaryFqw3BEmtHRJskVJs--
// 2进制编码
router.post("/upload/img", uploadImg.single("file"), (req, res) => {
  res.send({
    url: `/public/img/${req.file.filename}`
  });
});

// 下载文件
// 请求头
// Range: bytes=0-100 // 请求部分资源 0-100字节

// 响应头
// Content-Disposition: attachment; filename="wuyanzu.zip" // 内容处理 attachment附件 filename文件名
// Accept-Ranges: bytes // 单位
// Content-Length: 5270 // 文件大小



router.get("/download/:filename", (req, res) => {
  res.download(
    path.resolve(__dirname, "../../resources", req.params.filename),
    req.params.filename
  );
});

module.exports = router;
