// NPM packages.
const express = require("express");
const cookieParser = require("cookie-parser");

// Models.
const Todo = require("./../../models/Todo");
const User = require("./../../models/User");
const Group = require("./../../models/Group");

// Middleware.
const auth = require("./../../middleware/auth");

// Helpes & services.
const helperFunctions = require("../../helpers/helperFunctions");

// Init router.
const router = express.Router();
router.use(cookieParser());

/**
 * Create new todo.
 *
 * @param {String} title
 *   The title of the todo
 * @param {String} tags
 *   The tags of the todo
 * @param {Integer} rank
 *   The rank that determines where the todo will rank in the list
 *
 * @private
 *
 * @return {Object} todo
 */
router.post("/create", auth, async (req, res) => {
  try {
    const { title, tags, rank } = req.body;
    const user = await User.findById(req.user._id);

    // Early sanity checks.
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found");
    }
    const group = await Group.findById(user.groupID);
    if (!group) {
      return helperFunctions.custom404Error(res, "Group not found");
    }

    // Sanitize tags
    const tagsArray = tags.split(",");
    const tagsArraySan = tagsArray.map((tag) => {
      return tag.trim();
    });

    // Return if todo could not be created.
    const newTodo = new Todo({
      groupID: group._id,
      creatorID: user._id,
      creatorName: user.username,
      title: title,
      tags: tagsArraySan,
      rank: rank,
    });
    if (!newTodo) {
      return helperFunctions.sendServerErrorMsg(
        res,
        "Sorry, something went wrong."
      );
    }

    // Save new todo.
    await newTodo.save();
    res.status(201).send(newTodo);
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * Get all todos of the group of the user.
 *
 * @private
 *
 * @return {Array} todos.
 */
router.get("/", auth, async (req, res) => {
  try {
    // Get user.
    const user = await User.findById(req.user._id);
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found");
    }

    // Get group
    const group = await Group.findById(user.groupID);
    if (!group) {
      return helperFunctions.custom404Error(res, "Group not found");
    }

    // Get all todos.
    const todos = await Todo.find({
      groupID: user.groupID,
    });

    // Send empty array to client of no todos found.
    if (!todos) {
      res.status(200).send([]);
    }
    res.status(200).send(todos);
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * Update an existing todo.
 *
 * @param {String} todoID
 *   The id of the todo that shall be updated.
 * @param {String} title
 *   Optional. The title of the todo.
 * @param {Array} tags
 *   Optional. The tags of the todo.
 * @param {Integer} rank
 *   The rank of the todo.
 *
 * @return {Object} todo.
 */
router.patch("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found");
    }
    const todo = await Todo.findById(req.body.todoID);
    if (!todo) {
      return helperFunctions.custom404Error(res, "Todo not found");
    }
    // Check if todo belongs to user.
    if (todo.creatorID.toString() !== user._id.toString()) {
      return helperFunctions.sendCustom400Error(
        res,
        "You don't have permission to edit this todo."
      );
    }

    // Change title, tags and rank of todo, if applicable.
    const { title, tags, rank } = req.body;
    if (title) {
      todo.title = title;
    }
    if (tags) {
      todo.tags = tags;
    }
    if (rank) {
      todo.rank = parseInt(rank);
    }

    await todo.save();
    res.status(200).send(todo);
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * Delete a todo.
 *
 * @private
 *
 * @param todoID
 *   THe id of the todo that shall be deleted.
 *
 * @return null
 */
router.delete("/", auth, async (req, res) => {
  try {
    // Find user.
    const user = await User.findById(req.user._id);
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found");
    }

    // Find todo.
    const todo = await Todo.findById(req.body.todoID);
    if (!todo) {
      return helperFunctions.custom404Error(res, "Todo not found");
    }

    // Check if todo belongs to user.
    if (todo.creatorID.toString() !== user._id.toString()) {
      return helperFunctions.sendCustom400Error(
        res,
        "You don't have permission to edit this todo."
      );
    }

    // Delete todo.
    await Todo.deleteOne({ _id: req.body.todoID });
    res.status(200).send();
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

module.exports = router;
