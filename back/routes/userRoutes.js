const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.find);
router.post("/favorites", userController.favorites);
router.get("/favorites/:id", userController.favId);
router.delete("/:userId/delete/:mov", userController.deleteFav);
router.get("/:id", userController.findOnlyUser);

module.exports = router;
