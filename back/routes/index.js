const express = require("express");
const router = express.Router();

const loginRoutes = require("./loginRoutes");
const registerRoutes = require("./registerRoutes");
const me = require("./me");
const userRoutes = require("./userRoutes");

router.use("/register", registerRoutes);
router.use("/login", loginRoutes);
router.use("/me", me);
router.use("/user", userRoutes);

module.exports = router;
