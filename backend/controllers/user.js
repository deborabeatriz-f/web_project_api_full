const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/notFoundError");
const BadRequest = require("../errors/badRequest");
const UnauthorizedError = require("../errors/unauthorizedError");
require("dotenv").config();

const { JWT_SECRET } = process.env;

function createUser(req, res) {
  const { email, password, name, about, avatar } = req.body;

  if (!(email && password)) {
    throw new BadRequest("Dados inválidos");
  }

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function login(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new BadRequest("Email e senha obrigatórios");
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Email ou senha inválidos");
      }

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          throw new UnauthorizedError("Email ou senha inválidos");
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7 days",
        });

        return res.status(200).send({ token });
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function getUserProfile(req, res) {
  console.log(req.user);
  const userId = req.user._id;
  User.findById(userId)
    .then((users) => {
      if (!users) {
        throw new NotFoundError("Usuário não encontrado");
      }
      return res.status(200).json(users);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function findUsers(req, res) {
  return User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError("Usuário não encontrado");
      }
      return res.status(200).json(users);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function updateUser(req, res) {
  const userId = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(() => {
      throw new NotFoundError("Usuário não encontrado");
    })
    .then((updatedUser) => res.status(201).json(updatedUser))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function updateAvatar(req, res) {
  const userId = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail(() => {
      throw new NotFoundError("Usuário não encontrado");
    })
    .then((updatedAvatar) => res.status(201).json(updatedAvatar))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  createUser,
  findUsers,
  updateUser,
  updateAvatar,
  login,
  getUserProfile,
};
