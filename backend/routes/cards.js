const router = require("express").Router();

const {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/card");

const auth = require("../middlewares/auth");

router.post("/", auth, createCard);

router.get("/", auth, findCards);

router.delete("/:cardId", auth, deleteCard);

router.put("/:cardId/likes", auth, likeCard);

router.delete("/:cardId/likes", auth, dislikeCard);

module.exports = router;
