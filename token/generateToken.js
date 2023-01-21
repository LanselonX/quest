const jwt = require("jsonwebtoken");
const { secret } = require("../config");

class Token {
  generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
  };
}

module.exports = new Token();
