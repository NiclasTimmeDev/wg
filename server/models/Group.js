const mongoose = require("mongoose");
const uuid = require("uuid");

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
  entryCode: {
    type: String,
    required: true,
    default: uuid.v4(),
  },
});

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
