const User = require("../models/User");
const Role = require("../models/Role");
const tokensService = require("../services/tokens.service");
const bcrypt = require("bcryptjs");
// const controller = require("../controllers/auth.controller");

class AuthService {
  async registration(username, password) {
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: "USER" });
    const user = new User({
      username,
      password: hashPassword,
      roles: [userRole.value],
    });
    await user.save();
    const tokens = tokensService.generateTokens(user._id, user.roles);
    return tokens;
  }

  async checkPassword(recievedPassword, originalPassword) {
    return bcrypt.compareSync(recievedPassword, originalPassword);
  }

  async checkUser(username) {
    const candidate = await User.findOne({ username });
    return candidate;
  }
}

module.exports = new AuthService();
