const mongoose = require("mongoose");
require("dotenv/config");
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to mongodb database...");
  })
  .catch((error) => {
    console.error("Error connecting to mongodb", error);
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongodb connection closed");
    process.exit(0);
  });
});

module.exports = mongoose;
