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

router.post("/upload/img", uploadImg.single("file"), (req, res) => {
  res.send({
    url: `/public/img/${req.file.filename}`
  });
});

module.exports = router;
