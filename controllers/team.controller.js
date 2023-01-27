const Team = require("../models/Team");
const { castObject } = require("../models/User");
const User = require("../models/User");
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

  async addTeamMember(req, res) {
    try {
      const { leaderId, teamId } = req.body;
      await teamService.addTeamMember(leaderId, teamId);
      res.json({ message: "Команда успешно обновлена" });
    } catch (e) {
      res.status(400).json({ message: "Error: Ошибка создания команды" });
    }
  }
}

module.exports = new TeamController();
