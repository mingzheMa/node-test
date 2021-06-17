const express = require("express");

const nextCatch = require("../../utils/nextCatch");
const adminServices = require("../../services/admin");
const router = express.Router();

router.get(
  "/",
  nextCatch(async (req, res) => {
    const data = await adminServices.findAndCountAll(req.query);
    res.send(data);
  })
);

router.post(
  "/",
  nextCatch(async (req, res) => {
    const data = await adminServices.create(req.body);
    res.send(data);
  })
);

router.get(
  "/:id",
  nextCatch(async (req, res) => {
    const data = await adminServices.findByPk(req.params.id);
    res.send(data);
  })
);

router.delete(
  "/:id",
  nextCatch(async (req, res) => {
    const data = await adminServices.destroy(req.params.id);
    res.send(data);
  })
);

router.put(
  "/:id",
  nextCatch(async (req, res) => {
    const data = await adminServices.update(req.params.id, req.body);
    res.send(data);
  })
);

router.post(
  "/login",
  nextCatch(async (req, res) => {
    const data = await adminServices.login(req.body);
    res.send(data);
  })
);


module.exports = router;
