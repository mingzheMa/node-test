const express = require("express");
const path = require("path");
const ejs = require("ejs");

const nextCatch = require("../../utils/nextCatch");
const adminServices = require("../../services/admin");

const router = express.Router();

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
