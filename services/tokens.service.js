const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

class TokensService {
  generateTokens = (id, roles) => {
    const payload = { id, roles };
    const accessToken = jwt.sign(payload, secret_key, { expiresIn: "6h" });
    const refreshToken = jwt.sign(payload, secret_key, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  };
}

module.exports = new TokensService();
