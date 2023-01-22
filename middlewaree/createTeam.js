const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");
const { secret } = require("../config");

const app = express();

app.use(bodyParser.json());
app.post("createTeam", authMiddleware, (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "Token validation error" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const data = req.body;
    const teamName = data.name;
    const teamMembers = data.members;
    const teamCountry = data.country;

    console.log(`Team Name: ${teamName}`);
    console.log(`Team Members: `);
    teamMembers.forEach((member) => {
      console.log(member);
    });
    console.log(`Team country: ${teamCountry}`);

    res.send({ message: "Team created " });
  } catch (e) {
    return res.status(400).json({ message: "invalid token" });
  }
});
