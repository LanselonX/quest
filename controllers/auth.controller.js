const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const tokensController = require("./tokens.controller");
const zcxc = require("./users.controller");
const authService = require("../services/auth.service");

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { username, password } = req.body;

      const check = await authService.checkUser(username);

      if (check) {
        // if check exist
        return res.status(400).json({ message: "Пользователь существует" });
      }

      const result = await authService.registration(username, password);

      return res.json({
        message: "Пользователь успешно зарегистрирован",
        result,
      });
    } catch (e) {
      // console.log(e);
      res.status(400).json({ message: "Registration error: " + e.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error: " + e.message });
    }
  }
  // async login(req, res) {
  //   try {
  //     const { username, password } = req.body;
  //     const user = await User.findOne({ username });
  //     if (!user) {
  //       return res.status(400).json({ message: `Пользователь не найден` });
  //     }
  //     const validPassword = bcrypt.compareSync(password, user.password);
  //     if (!validPassword) {
  //       return res.status(400).json({ message: "Введен неверный пароль" });
  //     }
  //     const token = generateAccessToken(user._id, user.roles);
  //     return res.json({ token });
  //   } catch (e) {
  //     console.log(e);
  //     res.status(400).json({ message: "Login error" });
  //   }
  // }
}

module.exports = new AuthController();
