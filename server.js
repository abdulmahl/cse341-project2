const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./database/connection");

const route = require("./routes/index");

app.use(express.json());
app.use("/", route);


app.listen(port, () => {
  console.log(`Server running at port: ${port}...`);
});
