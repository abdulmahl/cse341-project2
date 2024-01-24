const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  height: String,
  jerseyNo: Number,
  position: String,
  shoeSize: Number,
  isCaptain: Boolean,
});

module.exports = mongoose.model("team_members", playerSchema);
