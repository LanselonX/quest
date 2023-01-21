const Router = require("express");
const router = new Router();
const { check } = require("express-validator");
const authController = require("./controllers/auth.controller");
const usersController = require("./controllers/users.controller");
const authMiddleware = require("./middlewaree/authMiddleware");

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get("/users", authMiddleware, usersController.getUsers);

module.exports = router;
