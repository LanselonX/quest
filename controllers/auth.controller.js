const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const tokensService = require("../services/tokens.service");
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
      const canditate = await authService.checkUser(username);
      if (canditate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем существует" });
      }

      const result = await authService.registration(username, password);
      return res.json({
        message: "Пользователь успешно зарегистрирован",
        result,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error: " + e });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const canditate = await authService.checkUser(username);
      if (!canditate) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      const validPassword = await authService.checkPassword(
        password,
        canditate.password
      );

      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" });
      }
      const token = tokensService.generateTokens(
        canditate._id,
        canditate.roles
      );
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" + e.message });
    }
  }
}

module.exports = new AuthController();
