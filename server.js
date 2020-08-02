require("dotenv").config();
require("./server/config/database");
const express = require("express");
const app = express();

// Init middleware.
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
