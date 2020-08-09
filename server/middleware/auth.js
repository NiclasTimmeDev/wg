const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helperFunctions = require("./../helpers/helperFunctions");

/**
 * Get token from cookie and put it to the request object.
 *
 * @param {Object} req
 *   The client request.
 * @param {Object} res
 *   The response object.
 * @param {Object} next
 *   The next parameter.
 */
module.exports = async (req, res, next) => {
  // Send error if no cookies.
  if (!req.session.accessToken) {
    return helperFunctions.sendCustom400Error(res, "Access denied.");
  }
  const token = req.session.accessToken;
  if (!token) {
    return helperFunctions.sendCustom400Error(res, "Access denied.");
  }
  try {
    // Put token to req.user
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    helperFunctions.sendServerErrorMsg(res, error);
  }
};
