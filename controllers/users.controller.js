const User = require("../models/User");

class UsersController {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {}
  }
}

module.exports = {
  vasya: "test",
};

module.exports = new UsersController();
