const express = require("express");

const nextCatch = require("../../utils/nextCatch");
const { encrypt } = require("../../utils/crypto");
const adminServices = require("../../services/admin");
const jwtUtil = require("../../utils/jwt");

const router = express.Router();

router.post(
  "/login",
  nextCatch(async (req, res) => {
    const data = await adminServices.login(req.body);

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
      maxAge: 86400
    });
    res.set("authorization", token);

    res.send(data);
  })
);

router.get(
  "/who_am_i",
  nextCatch(async (req, res) => {
    const adminId = req._jwt.id;
    const data = await adminServices.findByPk(adminId)
    res.send(data)
  })
);

module.exports = router;
