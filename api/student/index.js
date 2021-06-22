const express = require("express");

const nextCatch = require("../../utils/nextCatch");
const studentServices = require("../../services/student");
const router = express.Router();

router.get(
  "/",
  nextCatch(async (req, res) => {
    const data = await studentServices.findAndCountAll(req.query);

    res.send(data);
  })
);

router.get(
  "/:id",
  nextCatch(async (req, res) => {
    const data = await studentServices.findByPk(req.params.id);
    res.send(data);
  })
);

module.exports = router;
