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

  async findTeamById(teamId) {
    return await Team.findById(teamId);
  }
}
module.exports = new TeamService();

// module.exports = new TeamService();
// const Team = require("../models/Team");

// class TeamService {
//   async createTeam(username, password) {
//     const existingTeam = await Team.findOne({ teamname });
//     if (existingTeam) {
//       throw new Error("Команда уже существует");
//     }
//     const team = new Team({ teamname, country });
//     await team.save();
//     return team;
//   }
// }
