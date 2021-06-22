const express = require("express");
const cookie = require("cookie");

const nextCatch = require("../../utils/nextCatch");
const { encrypt } = require("../../utils/crypto");
const adminServices = require("../../services/admin");
const router = express.Router();

router.post(
  "/",
  nextCatch(async (req, res) => {
    const data = await adminServices.login(req.body);

    res.set(
      "set-cookie",
      cookie.serialize("token", encrypt(data.id.toString()), {
        path: "/",
        maxAge: 86400
      })
    );
    res.send(data);
  })
);

module.exports = router;
