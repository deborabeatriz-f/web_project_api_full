const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

function createUser(req, res) {
  const { email, password, name, about, avatar } = req.body;

  if (!(email && password)) {
    return res.status(400).send({ message: "Dados inválidos" });
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
    return res.status(400).send({ message: "Email e senha obrigatórios" });
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "Email ou senha inválidos" });
      }

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return res
            .status(401)
            .send({ message: "Email e senha obrigatórios" });
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
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      return res.status(200).json(users);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function findUsers(req, res) {
  return User.find({})
    .then((users) => {
      if (!users) {
        return res.status(404).send({ message: "Usuários não encontrados" });
      }
      return res.status(200).json(users);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

// function findUserById(req, res) {
//   const userId = req.params.id;

//   return User.findById({ _id: userId })
//     .then((users) => {
//       if (!users) {
//         return res.status(404).send({ message: "Usuário não encontrado" });
//       }
//       return res.status(200).json(users);
//     })
//     .catch((err) => res.status(500).send({ message: err.message }));
// }

function updateUser(req, res) {
  const userId = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error("Nenhum usuário encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.status(201).json(updatedUser))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function updateAvatar(req, res) {
  const userId = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error("Nenhum usuário encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((updatedAvatar) => res.status(201).json(updatedAvatar))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  createUser,
  findUsers,
  // findUserById,
  updateUser,
  updateAvatar,
  login,
  getUserProfile,
};
