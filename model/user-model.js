const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  thumbnail: String,
});

const User = mongoose.model("player_user", userSchema);
module.exports = User;
