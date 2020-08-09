require("dotenv").config();
const connect = require("./server/config/database");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

//initializePassport(passport);

// Init middleware.
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_ID,
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.mongoURI,
      collection: "sessions",
    }),
    cookie: {
      maxAge: 86400000,
      sameSite: true,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(express.json({ extended: false }));

// Declare routes.
app.use("/api/users", require("./server/routes/api/users"));
app.use("/api/groups", require("./server/routes/api/groups"));
app.use("/api/todos", require("./server/routes/api/todos"));

// Get port from .env.
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
