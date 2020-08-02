const mongoose = require("mongoose");

const dbCredentials = process.env.mongoURI;

/**
 * Connect to the databse
 *
 * @return null
 */
(async () => {
  try {
    await mongoose.connect(dbCredentials, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
    console.error("Database connection failed");
    process.exit(1);
  }
})();
