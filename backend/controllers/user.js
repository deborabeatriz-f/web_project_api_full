const User = require("../models/user");

function createUser(req, res) {
  const { email, password, name, about, avatar } = req.body;

    if (!(email && password && name && about && avatar)) {
    return res.status(400).send({ message: "Dados inválidos" });
  }

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      email,
      password: hash,
    })
  );

  return User.create({ email, password, name, about, avatar })
    .then((user) => res.status(201).json(user))
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

function findUserById(req, res) {
  const userId = req.params.id;
  return User.findById({ _id: userId })
    .then((users) => {
      if (!users) {
        return res.status(404).send({ message: "Usuário não encontrado" });
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
  findUserById,
  updateUser,
  updateAvatar,
};
