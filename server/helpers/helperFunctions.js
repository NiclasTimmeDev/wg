const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  sendServerErrorMsg: (res, error) => {
    if (error.kind == "ObjectId") {
      return res.status(404).send({ errors: [{ msg: "Object not found." }] });
    }
    res.status(500).send({
      errors: [{ msg: "Sorry, something went wrong. Please try again later." }],
    });
  },
  sendCustom400Error: (res, msg) => {
    return res.status(400).send({
      errors: [{ msg: msg }],
    });
  },
  custom404Error: (res, msg) => {
    return res.status(404).send({
      errors: [{ msg: msg }],
    });
  },
  signToken: (tokenPayload) => {
    return jwt.sign(tokenPayload, process.env.JWTSECRET, {
      expiresIn: 86400000,
    });
  },
};
