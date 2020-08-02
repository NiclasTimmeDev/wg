const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      username: {
        type: String,
        res: "users",
        required: true,
      },
    },
  ],
  premium: {
    type: Boolean,
    required: true,
    default: false,
  },
  invitations: [
    {
      uid: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  ],
});

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
