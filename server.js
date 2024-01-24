const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./database/connection");
const route = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS "
  );
  res.status(200);
  next();
});

app.use("/", route);

app.listen(port, () => {
  console.log(`Server running at port: ${port}...`);
});
