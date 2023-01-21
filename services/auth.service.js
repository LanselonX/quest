const User = require("../models/User");
const Role = require("../models/Role");
const token = require("../controllers/tokens.controller");
const bcrypt = require("bcryptjs");
// const controller = require("../controllers/auth.controller");

class AuthService {
  async registration(username, password) {
    // const canditate = await User.findOne({ username });
    // if (canditate) {
    //   return res
    //     .status(400)
    //     .json({ message: "Пользователь с таким именем существует" });
    // }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: "USER" });
    const user = new User({
      username,
      password: hashPassword,
      roles: [userRole.value],
    });
    await user.save();
    const tokens = tokensController.generateTokens(user._id, user.roles);

    return tokens;
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: `Пользователь не найден` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Введен неверный пароль" });
    }
    const token = generateAccessToken(user._id, user.roles);
    return res.json({ token });
  }
}

module.exports = new AuthService();
