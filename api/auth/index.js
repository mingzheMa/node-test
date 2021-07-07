const express = require("express");

const nextCatch = require("../../utils/nextCatch");
const { encrypt } = require("../../utils/crypto");
const jwtUtil = require("../../utils/jwt");
const error = require("../../utils/error");

const adminServices = require("../../services/admin");

const router = express.Router();

// session校验验证码
async function verificationCaptcha(req) {
  if (req.session.captcha.isCaptcha) {
    if (req.session.captcha.key !== req.body.captcha.toLowerCase()) {
      return Promise.reject(error[1004]);
    } else {
      req.session.captcha.isCaptcha = false;
      req.session.captcha.key = "";
    }
  }
}

// 处理频率
async function within(req) {
  // 记录请求频率
  const within = 5; // 五秒以内
  const reqFrequency = 5; // 五次

  if (!req.session.captcha.frequency) {
    req.session.captcha.frequency = [];
  } else {
    // 删除超时数据
    req.session.captcha.frequency = req.session.captcha.frequency.filter(
      d => Date.now() - d < 1000 * within
    );
  }

  // 记录本次请求
  req.session.captcha.frequency.push(Date.now());

  // 如果在within秒以内请求大于reqFrequency次
  if (req.session.captcha.frequency.length > reqFrequency) {
    req.session.captcha.isCaptcha = true;
    req.session.captcha.frequency = [];
    return Promise.reject(error[1005]);
  }
}

router.post(
  "/login",
  nextCatch(async (req, res) => {
    // 一开始并不会请求验证码图片，所以captcha为空
    if (!req.session.captcha) {
      req.session.captcha = {};
    }

    // 记录请求频率以及判断是否为人工操作，否则记录下次校验验证码并且返回错误
    if (!req.session.captcha.isCaptcha) {
      await within(req);
    }
    // 如果需要验证则验证，不需要则跳过
    await verificationCaptcha(req);

    // 登录操作
    const data = await adminServices.login(req.body).catch(err => {
      // 如果参数错误，下一次请求需要提交验证码
      req.session.captcha.isCaptcha = true;
      return Promise.reject(err);
    });

    // cookie校验
    // res.cookie("set-cookie", encrypt(data.id.toString()), {
    //   path: "/",
    //   maxAge: 86400
    // });

    // session校验
    // req.session.user = data;

    // jwt校验
    const token = jwtUtil.val2Token({ id: data.id });
    res.cookie("token", token, {
      path: "/",
      maxAge: 1000 * 60 * 60, // 一小时
      // 防止CSRF攻击，比如用户在访问过本站后打开了一个新页面，该页面请求本站做一些入库操作（当然在用户不知情的情况下），因为用户之前登录过本站，所以请求自动带cookie，本站无法分辨是否收到了CSRF攻击
      sameSite: "Lax"
    });
    res.set("authorization", token);

    res.send(data);
  })
);

router.get(
  "/who_am_i",
  nextCatch(async (req, res) => {
    const adminId = req._jwt.id;
    const data = await adminServices.findByPk(adminId);
    res.send(data);
  })
);

router.post(
  "/register",
  nextCatch(async (req, res) => {
    // 验证验证码
    req.session.captcha.isCaptcha = true;
    await verificationCaptcha(req);

    // 注册操作
    const data = await adminServices.create(req.body);
    res.send(data);
  })
);

module.exports = router;
