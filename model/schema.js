const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  firstname: String,
  lastname: String,
  age: Number,
  height: String,
  jerseyNo: Number,
  position: String,
  shoeSize: Number,
  isCaptain: Boolean,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const userSchema = new Schema({
  username: String,
  githubId: String,
  thumbnail: String,
});

const Player = mongoose.model("team_members", PlayerSchema);
const User = mongoose.model("player_user", userSchema);
module.exports = { Player, User };
