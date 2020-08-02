const bcrypt = require("bcryptjs");

/**
 * Validates the user passwords.
 * Also checks old password if password should be updated
 *
 * @param {String} password1
 * @param {String} password2
 * @param {String} currentPassword
 * @param {String} currentPasswordFromDB
 *
 * @return {Array} validationResults
 */
const verifyPassword = async (
  password1,
  password2,
  currentPassword = false,
  currentPasswordFromDB = false
) => {
  if (password1 === "") {
    return [false, "Please enter a password."];
  }
  if (password2 === "") {
    return [false, "Please confirm your password."];
  }
  if (password1 !== password2) {
    return [false, "Your two passwords must match."];
  }
  if (password1.length < 8) {
    return [false, "Your password must have at least 8 characters."];
  }
  if (
    password1.includes("passwor") ||
    password1.includes("123456") ||
    password1.includes("000000")
  ) {
    return [
      false,
      "Your password may not include 'password', '000000' or '123456'",
    ];
  }

  if (currentPassword !== false && currentPasswordFromDB !== false) {
    const isMatch = await bcrypt.compare(
      currentPassword,
      currentPasswordFromDB
    );
    if (!isMatch) {
      return [false, "Your current password is incorrect."];
    }
  }

  return [true];
};

module.exports = {
  verifyPassword,
};
