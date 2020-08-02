const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const helperFunctions = require("./../helpers/helperFunctions");

module.exports = async (req, res, next) => {
  if (!req.cookies) {
    return helperFunctions.sendCustom400Error(res, "Access denied.");
  }

  const token = req.cookies.token;
  if (!token) {
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
};
