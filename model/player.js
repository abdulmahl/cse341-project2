const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema({
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

module.exports = mongoose.model("team_members", PlayerSchema);
