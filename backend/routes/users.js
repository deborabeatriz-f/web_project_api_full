const router = require("express").Router();

const {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  updateAvatar,
  login,
} = require("../controllers/user");

const auth = require("../middlewares/auth");

router.get("/", auth, findUsers);

router.get("/:id", auth, findUserById);

router.post("/register", createUser);

router.post("/me", login);

router.patch("/", auth, updateUser);

router.patch("/avatar", auth, updateAvatar);

module.exports = router;
