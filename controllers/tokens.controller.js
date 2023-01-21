const jwt = require("jsonwebtoken");
const { secret } = require("../config");

class Token {
  generateTokens = (id, roles) => {
    const payload = { id, roles };
    const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, secret, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  };
}

module.exports = new Token();
