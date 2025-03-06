const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());

// Implementação de uma Solução de Autorização Temporária
app.use((req, res, next) => {
  req.user = {
    _id: "679e26df57feee8a89b63933",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.get("/", (req, res) => {
  res.send(`Hello world!`);
});

app.use("*", (req, res) => {
  return res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
