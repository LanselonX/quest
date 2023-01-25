const User = require("../models/User");
const usersController = require("../controllers/users.controller");
const { find } = require("../models/User");
const Team = require("../models/Team");
const teamService = require("./team.services");

class userService {
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (e) {
      throw new Error("Пиздец не существует");
    }
  }

  async findUser(userId) {
    return await User.findById(userId);
  }

  async updateUser(userId, teamId) {
    try {
      const user = await this.findUser(userId);
      if (!user) {
        throw new Error("User ID not found");
      }
      const team = await Team.findById(teamId);
      if (!team) {
        throw new Error("Team ID not found");
      }
      const updated = User.findByIdAndUpdate(
        { _id: userId },
        { team: teamId },
        { new: true }
      );
      return updated;
    } catch (e) {
      if (e.message === "Team ID not found") {
        console.log("Team registration stopped: " + e.message);
      } else {
        throw new Error("Ошибка в updateUser" + e.message);
      }
    }
  }
}

module.exports = new userService();
