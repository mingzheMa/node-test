const express = require("express");
const path = require("path");
const ejs = require("ejs");

const nextCatch = require("../../utils/nextCatch");
const adminServices = require("../../services/admin");

const router = express.Router();

// 传统的MVC模式，module、view、controller
// module 数据模型
// view 视图
// controller 控制器

// 请求 -> 控制器获取数据模型 -> 控制器拼接视图 -> 返回响应

router.get(
  "/admin",
  nextCatch(async (req, res) => {
    const data = await adminServices.findAndCountAll(req.query);

    const html = await ejs.renderFile(
      path.resolve(__dirname, "../../view/adminList.ejs"),
      {
        ...data
      }
    );

    res.send(html);
  })
);

module.exports = router;
