const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  groupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
  },
  creatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  creatorName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [{ type: String }],
  rank: {
    type: Number,
    required: true,
  },
});

const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
