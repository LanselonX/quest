const Team = require("../models/Team");
const Role = require("../models/Role");
const tokensService = require("../services/tokens.service");
const userService = require("./user.service");

class TeamService {
  async createTeam(teamname, country, user) {
    console.log(teamname, country);
    const existingTeam = await Team.findOne({ teamname });
    if (existingTeam) {
      throw new Error("Команда уже существует");
    }
    const team = await Team.create({
      teamname,
      country,
      leader: user,
      members: [user],
    });
    await userService.updateUser(user, team._id);
    return team;
  }
}
module.exports = new TeamService();
