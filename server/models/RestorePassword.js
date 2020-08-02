const mongoose = require("mongoose");
const uuid = require("uuid");

const restorePasswordSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    default: uuid.v4(),
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    rerquired: true,
  },
});

const RestorePassword = mongoose.model(
  "restorePassword",
  restorePasswordSchema
);

module.exports = RestorePassword;
