// NPM packages.
const express = require("express");
const cookieParser = require("cookie-parser");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

// Models.
const User = require("./../../models/User");
const RestorePassword = require("./../../models/RestorePassword");

// Middleware.
const auth = require("./../../middleware/auth");

// Helpers & services.
const helperFunctions = require("./../../helpers/helperFunctions");
const mail = require("./../../services/mail/mail");
const userService = require("./../../services/users/users");

// Init router.
const router = new express.Router();
router.use(cookieParser());

/**
 * REGISTRATION
 *
 * @Route /api/users/register
 * @Method POST
 * @Access public
 *
 * @param {String} username
 * @param {String} email
 * @param {String} password1
 * @param {String} password2
 *
 * @return {String} token
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password1, password2 } = req.body;
    // Return if no username provided.
    if (username === "") {
      return helperFunctions.sendCustom400Error(res, {
        username: "Please enter a username",
      });
    }

    // Return if email invalid.
    if (!validator.isEmail(email)) {
      return helperFunctions.sendCustom400Error(res, {
        email: "Please enter a valid email address.",
      });
    }

    // Error email is taken.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return helperFunctions.sendCustom400Error(res, {
        email: "Sorry, this email address is already taken.",
      });
    }

    // Call helper function to validate password
    const passwordValidation = await userService.verifyPassword(
      password1,
      password2
    );

    // Return if password validation returned error.
    if (!passwordValidation[0]) {
      return helperFunctions.sendCustom400Error(res, {
        password: passwordValidation[1],
      });
    }

    // Create new User.
    const newUser = new User({
      username: username,
      email: email,
      password: password1,
    });

    // Create token with user ID as payload.
    const tokenpayload = {
      user: {
        _id: newUser._id,
      },
    };
    const token = helperFunctions.signToken(tokenpayload);

    // Return if token signing went wrong.
    if (!token) {
      return helperFunctions.sendServerErrorMsg(
        res,
        "Sorry, something went wrong. Please try again later."
      );
    }

    //Save new user.
    await newUser.save();

    // Send token to client.
    res
      .status(201)
      .cookie("token", token, { httpOnly: true, maxAge: 3600 })
      .send(token);
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * LOGIN
 *
 * @Route /api/users/login
 * @Method POST
 * @Access Public
 *
 *
 * @param {String} email
 * @param {String} password
 *
 * @return {String} token
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Return if email is invalid.
  if (!validator.isEmail(email)) {
    return helperFunctions.sendCustom400Error(
      res,
      "Please provide a valid email address."
    );
  }

  // Return if password is empty.
  if (password === "") {
    return helperFunctions.sendCustom400Error(res, "Please enter a password");
  }

  // Return if user user could not be found or password does not match.
  const user = await User.findByCredentials(email, password);
  if (!user) {
    return helperFunctions.custom404Error(
      res,
      "Invalid credentials. Please try again."
    );
  }

  // Sign token.
  const tokenpayload = {
    user: {
      _id: user._id,
    },
  };
  const token = helperFunctions.signToken(tokenpayload);

  // Return if token signing failed.
  if (!token) {
    return helperFunctions.sendServerErrorMsg(
      res,
      "Sorry, something went wrong. Please try again later."
    );
  }

  // Return token.
  res
    .status(201)
    .cookie("token", token, { httpOnly: true, maxAge: 3600 })
    .send(token);
});

/**
 * GET USER
 *
 * @Route /api/users/get/single
 * @Method GET
 * @Access private
 *
 * @Return User
 */
router.get("/get/single", auth, async (req, res) => {
  // Find user by ID and drop password.
  try {
    const id = req.user;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found.");
    }
    res.status(200).send(user);
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * UPDATE USER
 * @Method PATCH
 * @Access private
 *
 * @param {String} username
 * @param {String} olPassword
 * @param {String} newPassword
 * @param {String} newPasswordConfirmed
 *
 * @return User
 */
router.patch("/update", auth, async (req, res) => {
  try {
    const {
      username,
      oldPassword,
      newPassword,
      newPasswordConfirmed,
    } = req.body;
    const user = await User.findById(req.user);

    if (!user) {
      return helperFunctions.sendCustom400Error(
        res,
        "User not found. Access denied."
      );
    }

    // Return if user tries to change admin status or premium status.
    if (req.body.premium) {
      return helperFunctions.sendCustom400Error(
        res,
        "You may not change your premium status."
      );
    }
    if (req.body.admin) {
      return helperFunctions.sendCustom400Error(
        res,
        "You may not change your admin status."
      );
    }

    // Get username.
    if (username) {
      user.username = username;
    }

    // Return if emtpy password is given.
    if (oldPassword === "") {
      return helperFunctions.sendCustom400Error(
        res,
        "Please enter your current password"
      );
    }

    // Do password checks if old password is provided.
    if (oldPassword) {
      // Conduct password validation.
      const passwordValidation = await userService.verifyPassword(
        newPassword,
        newPasswordConfirmed,
        oldPassword,
        user.password
      );

      // Return if password validation failed.
      if (!passwordValidation[0]) {
        return helperFunctions.sendCustom400Error(res, passwordValidation[1]);
      }

      user.password = newPassword;
    }

    // Save
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * LOGOUT
 *
 * @Route /api/users/logout
 * @Method POST
 * @Access private
 *
 * @return null
 */
router.post("/logout", auth, async (req, res) => {
  try {
    if (req.cookies.token) {
      res.status(200).clearCookie("token").send("Logged out");
    }
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * DELETE USER
 *
 * @Route /api/users/delete
 * @Method DELETE
 * @Access private
 *
 * @return null
 */
router.delete("/delete", auth, async (req, res) => {
  try {
    const _id = req.user;
    await User.deleteOne({ _id });
    res.status(200).send("User deleted");
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * FORGOT PASSWORD
 *
 * @param {String} email
 *
 * @return null
 */
router.post("/password/forgot", async (req, res) => {
  const email = req.body.email;
  try {
    // Get the user from Database.
    let user = await User.findOne({ email });

    // Return if no user found for the given email.
    if (!user) {
      return helperFunctions.custom404Error(
        res,
        "We could not find a user for that email address."
      );
    }

    let restore = await RestorePassword.findOne({ userID: user._id });

    if (!restore) {
      restore = new RestorePassword({
        userID: user._id,
        email: user.email,
        timestamp: new Date().getTime(),
      });
    } else {
      const uid = uuid.v4();
      restore.uid = uid;
      restore.timestamp = new Date().getTime();
    }

    await restore.save();

    // Send mail with link to restore password.
    mail.forgotPassword(email, restore.uid, restore.timestamp);

    return res.status(200).send();
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/**
 * RESTORE PASSWORD.
 *
 * @param {String} email
 * @param {String} id
 * @param {String} timestamp
 * @param {String} newPassword
 * @param {String} newPasswordConfirmed
 *
 * @return null
 */
router.post("/password/restore", async (req, res) => {
  // Get variables from request.
  const { email, id, timestamp, newPassword, newPasswordConfirmed } = req.body;

  try {
    // Find user and document with data for restoring the password.
    const user = await User.findOne({ email });
    const restore = await RestorePassword.findOne({ email });

    // Early sanity checks.
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found");
    }
    if (!restore) {
      return helperFunctions.custom404Error(
        res,
        "This password should not be altered"
      );
    }

    // Check if provided values match the DB values.
    if (id !== restore.uid || timestamp !== restore.timestamp) {
      return helperFunctions.sendCustom400Error(
        res,
        "You have no permission to edit this password"
      );
    }

    // Exit if password was declared as forgotten
    // longer than 5 minutes ago.
    const now = new Date().getTime();
    // Difference in minutes
    const timeDiff = (now - timestamp) / 60000;
    if (timeDiff > 5) {
      return helperFunctions.sendCustom400Error(res, "Sorry, you are too late");
    }

    // Check new passwords.
    const isPasswordValid = await userService.verifyPassword(
      newPassword,
      newPasswordConfirmed
    );
    if (isPasswordValid[0] === false) {
      return helperFunctions.sendCustom400Error(res, isPasswordValid[1]);
    }

    // Save new values to DB and return 200.
    user.password = newPassword;
    await user.save();
    await RestorePassword.deleteOne({ email });
    return res.status(200).send("Password restored");
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

module.exports = router;
