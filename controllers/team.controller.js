const Team = require("../models/Team");
const teamService = require("../services/team.services");

class TeamController {
  async createTeam(req, res) {
    try {
      const { teamname, country, user } = req.body;
      const team = await teamService.createTeam(teamname, country, user);
      res.json({ message: "Команда создана ", team });
    } catch (e) {
      res.status(500).json({ message: "Ошибка создания команды" + e.message });
    }
  }
}

module.exports = new TeamController();
