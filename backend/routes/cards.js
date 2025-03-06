const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { createCard, findCards, deleteCard, likeCard, dislikeCard } = require("../controllers/card");

const cardsPath = path.join(__dirname, "../data/cards.json");

router.post("/", createCard);

router.get("/", findCards);

router.delete("/:cardId", deleteCard);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
