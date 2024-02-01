const express = require("express");
const app = express();
const session = require("express-session");
const port = process.env.PORT || 3000;
const connectDB = require("./database/connection");
const passport = require("passport");
const route = require("./routes");
const authRoute = require("./routes/auth-routes");
const cookieKey = process.env.COOKIE_KEY;

app.set("view engine", "ejs");

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

app.use(
  session({
    secret: cookieKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", route);
app.use("/auth", authRoute);

connectDB();
app.listen(port, () => {
  console.log(`Server running at port: ${port}...`);
});
