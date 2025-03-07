const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Autorização necessária" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Authorization required" });
  }

  req.user = payload;

  next();
};

module.exports = auth;
