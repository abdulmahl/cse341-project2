const mongoose = require("mongoose");
require("dotenv/config");
const uri = process.env.MONGO_URI;

const manager = mongoose.connect(
  uri,
  console.log("Connected to mongodb database...")
);

module.exports = manager;
