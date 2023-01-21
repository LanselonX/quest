const User = require("../models/User");

class AuthService {
  async registration(username, password) {
    const canditate = await User.findOne({ username });
    if (canditate) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким именем существует" });
    }
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
}

module.exports = new AuthService();
