const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/user");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
mongoose.connect(
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/authdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(requestLogger);

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

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
