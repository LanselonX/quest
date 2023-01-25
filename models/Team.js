const { Schema, model, default: mongoose } = require("mongoose");
const User = require("./User");

const Team = new Schema({
  teamname: { type: String, unique: true, required: true },
  country: { type: String, required: true },
  members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  leader: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = model("Team", Team);
