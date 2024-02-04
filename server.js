const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection");
const session = require("express-session");
const passport = require("passport");

const route = require("./routes");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user-route");
const playerRouter = require("./routes/player-route");
const cookieKey = process.env.COOKIE_KEY;

const port = process.env.PORT || 3000;
const app = express();

app
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use("*", cors());

app.set("view engine", "ejs");
app
  .use(express.json())
  .use(
    session({
      secret: cookieKey,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use("/", route)
  .use("/", indexRouter)
  .use("/", userRouter)
  .use("/", playerRouter);

// app.get("/", (req, res) => {
//   res.render("home");
// });

// app.use("/dashboard", dashboardRouter);

// app.get("/dashboard", (req, res) => {
//   if (req.session.user !== undefined) {
//     res.render("dashboard", { user: req.session.user });
//   } else {
//     res.redirect("/");
//   }
// });

// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       console.error("Error logging you out ", err);
//       return res.redirect("/");
//     }
//     res.render("home");
//   });
// });

// app.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     failureRedirect: "/api-docs",
//     session: false,
//   }),
//   (req, res) => {
//     req.session.user = req.user;
//     res.redirect("/dashboard/");
//   }
// );

connectDB();
app.listen(port, () => {
  console.log(`Server running at port: ${port}...`);
});
