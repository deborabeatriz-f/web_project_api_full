const Card = require("../models/card");

function createCard(req, res) {
  const { name, link } = req.body;

  if (!(name && link)) {
    return res.status(400).send({ message: "Dados inválidos" });
  }

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).json(card))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function findCards(req, res) {
  return Card.find({})
    .then((cards) => {
      if (!cards) {
        return res.status(404).send({ message: "Card não encontrado" });
      }
      return res.status(200).json(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function deleteCard(req, res) {
  const cardId = req.params.cardId;
  return Card.findByIdAndDelete({ _id: cardId })
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) =>
      res.status(200).send({ message: "Cartão deletado com sucesso" })
    )
    .catch((err) => res.status(500).send({ message: err.message }));
}

function likeCard(req, res) {
  const cardId = req.params.cardId;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).send({ message: err.message }));
}

function dislikeCard(req, res) {
  const cardId = req.params.cardId;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = { createCard, findCards, deleteCard, likeCard, dislikeCard };
