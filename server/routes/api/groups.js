// NPM packages
const express = require("express");
const cookieParser = require("cookie-parser");
const validator = require("validator");
const uuid = require("uuid");

// Models.
const Group = require("../../models/Group");
const User = require("./../../models/User");

// Helpers & Services.
const mailService = require("./../../services/mail/mail");
const helperFunctions = require("../../helpers/helperFunctions");

// Middleware.
const auth = require("./../../middleware/auth");

// Init router.
const router = express.Router();
router.use(cookieParser());
/**
 * Create a new group
 *
 * @private
 *
 * @param {String} name
 *
 * @return {object} newGroup
 */
router.post("/create", auth, async (req, res) => {
  try {
    const id = req.user._id;
    const name = req.body.name;
    const user = await User.findById(id);

    // Return if user is member
    if (user.groupID) {
      return helperFunctions.sendCustom400Error(
        res,
        "Sorry, you are already member in a group."
      );
    }

    // Create new group entity.
    const newGroup = Group({
      creator: user._id,
      name: name,
      members: [
        {
          userID: user._id,
          username: user.username,
        },
      ],
    });

    // Return if group could not be created
    if (!newGroup) {
      helperFunctions.sendServerErrorMsg(res, "Sorry, something went wrong.");
    }

    // Assign group ID to user.
    user.groupID = newGroup._id;

    // Save entities.
    await newGroup.save();
    await user.save();

    res.status(200).send(newGroup);
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error.message);
  }
});

/**
 * Get the group of a user
 *
 * @private
 *
 * @return {obj} Group
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Return if user not found.
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found");
    }
    console.log(user.groupID);
    // Get Group of the user.
    const group = await Group.findOne({
      "members.userID": user._id,
    });

    // Return if no group found.
    if (!group) {
      return helperFunctions.custom404Error(res, "Group not found");
    }

    // Send group to client.
    res.status(200).send(group);
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error.message);
  }
});

/**
 * Send invitation to join group
 *
 * @private
 *
 * @param {String} email
 *   The email address the invitation will be sent to.
 *
 * @param {String} msg
 *   Optional. A custom message the receiver will get in the mail.
 *
 * @return null.
 *
 */
router.post("/invite", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const group = await Group.findOne({
      "members.userID": user._id,
    });
    if (!group) {
      return helperFunctions.custom404Error(res, "Group not found.");
    }
    // Email that should be invited.
    const email = req.body.email;

    const customMsg = req.body.msg ? req.body.msg : "";

    // Early sanity checks.
    if (!email) {
      return helperFunctions.custom404Error(
        res,
        "Please provide the email address of the person you want to invite."
      );
    }
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found");
    }
    const isEmailValid = validator.isEmail(email);
    if (!isEmailValid) {
      return helperFunctions.sendCustom400Error(
        res,
        "Please provide a valid email address"
      );
    }

    // Check if email is mapped to an account and already in a group.
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser && existingUser.groupID) {
      return helperFunctions.sendCustom400Error(
        res,
        "There already is a user with that email who is in another group."
      );
    }

    // Send email with link to accept invitation.
    const uid = uuid.v4();
    await mailService.sendInvitation(
      user.username,
      user.email,
      email,
      uid,
      customMsg
    );

    // Save uid to Group document.
    group.invitations = [...group.invitations, { uid: uid, email: email }];
    await group.save();

    res.status(200).send();
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

router.post("/accept/:uid", auth, async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await User.findById(req.user._id);

    // Early sanity checks.
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found");
    }
    if (!uid) {
      return helperFunctions.sendCustom400Error(
        res,
        "Could not identify the group."
      );
    }

    const group = await Group.findOne({
      "invitations.uid": uid,
    });
    if (!group) {
      return helperFunctions.sendCustom400Error(
        res,
        "Could not identify the group."
      );
    }

    const openInvitations = group.invitations;
    // Check if uid matches open invitations of the group.
    const invitation = openInvitations.filter((invitation) => {
      return invitation.uid === uid;
    });
    if (!invitation) {
      return helperFunctions.sendCustom400Error(
        res,
        "You do not have permission to enter the group."
      );
    }

    // Check if email address for validation code matches the email of the user.
    if (invitation[0].email !== user.email) {
      return helperFunctions.sendCustom400Error(
        res,
        "This invitation was not for you."
      );
    }

    // Unset invitation code in group.
    const remainingInvitations = group.invitations.filter((invitation) => {
      return invitation.uid !== uid;
    });
    group.invitations = remainingInvitations;

    // Check if user is already member of the group.
    const groupMembers = group.members;
    const userIsNotAlreadyMember = groupMembers.every((member) => {
      return member.userID.toString() !== user._id.toString();
    });
    if (!userIsNotAlreadyMember) {
      return helperFunctions.sendCustom400Error(
        res,
        "You are already a member!"
      );
    }

    // Add user to group
    group.members = [
      ...group.members,
      { userID: user._id, username: user.username },
    ];

    // Add groupID to user.
    user.groupID = group._id;

    await group.save();
    await user.save();

    res.status(200).send(group);
  } catch (error) {
    return helperFunctions.sendServerErrorMsg(res, error);
  }
});

module.exports = router;
