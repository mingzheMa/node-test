const express = require("express");
const svgCaptcha = require("svg-captcha");

const error = require("../../utils/error");
const nextCatch = require("../../utils/nextCatch");

const router = express.Router();

// 生成验证码
router.get(
  "/",
  nextCatch(async (req, res) => {
    const c = svgCaptcha.create();
    req.session.captcha = {
      ...req.session.captcha,
      // 不区分大小写
      key:c.text.toLowerCase(),
    };

    res.type("svg")
    res.send(c.data);
  })
);


module.exports = router;
