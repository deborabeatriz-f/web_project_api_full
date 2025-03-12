const Card = require("../models/card");
const NotFoundError = require("../errors/notFoundError");
const BadRequest = require("../errors/badRequest");

function createCard(req, res) {
  const { name, link } = req.body;

  if (!(name && link)) {
    throw new BadRequest("Dados inválidos");
  }

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).json(card))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function findCards(req, res) {
  return Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError("Usuário não encontrado");
      }
      return res.status(200).json(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function deleteCard(req, res) {
  const cardId = req.params.cardId;
  const userId = req.user._id;
  return Card.findByIdAndDelete({ _id: cardId, owner: userId })
    .orFail(() => {
      throw new NotFoundError("Usuário não encontrado");
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
      throw new NotFoundError("Usuário não encontrado");
    })
    .then((card) => res.status(200).json(card))
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
      throw new NotFoundError("Usuário não encontrado");
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = { createCard, findCards, deleteCard, likeCard, dislikeCard };
