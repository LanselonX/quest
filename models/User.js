const { Schema, model, default: mongoose } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  team: { type: mongoose.Types.ObjectId, ref: "Team" },
});

module.exports = model("User", User);
