const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  updateAvatar,
} = require("../controllers/user");

const usersPath = path.join(__dirname, "../data/users.json");

router.post("/", createUser);

router.get("/", findUsers);

router.get("/:id", findUserById);

router.patch("/", updateUser);

router.patch("/avatar", updateAvatar);

module.exports = router;
