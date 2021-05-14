const express = require("express");
const router = express.Router();
const tokenMiddleware = require("./tokenmiddleware");
const User = require("../models/index");

router.get("/", tokenMiddleware, (req, res, next) => {
  const email = req.user.email;
  User.findOne({ where: { email } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

module.exports = router;
