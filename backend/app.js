const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/user");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

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
