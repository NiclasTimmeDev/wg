const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Create user schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  premium: {
    type: Boolean,
    required: true,
    default: false,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  groupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
  },
});

/**
 * Hash password whenever user is saved.
 *
 * @param next
 *   From middleware.
 * @return null
 *   Goes on to next function.
 */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

/**
 * Fing the user by mail and check the given password.
 *
 * @param {String} email
 *   The users email.
 * @param {String} password
 *   The users password.
 *
 * @return User user || null
 *   The user or null
 *
 */
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return;
  }
  return user;
};

// Create Model.
const User = mongoose.model("User", userSchema);

module.exports = User;
