const express = require("express");
const bodyParser = require("body-parser");
const authMiddleware = require("./authMiddleware");

const app = express();

app.use(bodyParser.json());
app.post("createTeam", authMiddleware, (req, res) => {
  const data = req.body;
  const teamName = data.name;
  const teamMembers = data.members;
  const teamCountry = data.country;

  console.log(`Team Name: ${teamName}`);
  console.log(`Team Members: `);
  teamMembers.forEach((member) => {
    console.log(member);
  });
  console.log(`Team Country: ${teamCountry}`);

  //Псевдо логика для тимы, только надо выцеплять данные из req.body, пока что хз как их брать для проверки

  res.send({ message: "Team created " });
});
