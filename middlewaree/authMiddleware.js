const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const secret_key = process.env.SECRET_KEY;

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован " });
    }
    const decodedData = jwt.verify(token, secret_key);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Пользователь не авторизован " });
  }
};
