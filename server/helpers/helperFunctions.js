const jwt = require("jsonwebtoken");

module.exports = {
  sendServerErrorMsg: (res, error) => {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).send({ errors: [{ msg: "Object not found." }] });
    }
    res.status(500).send({
      errors: [{ msg: "Sorry, something went wrong. Please try again later." }],
    });
  },
  sendCustom400Error: (res, msg) => {
    return res.status(400).send({
      error: [{ msg: msg }],
    });
  },
  custom404Error: (res, msg) => {
    return res.status(404).send({
      error: [{ msg: msg }],
    });
  },
  signToken: (tokenPayload) => {
    return jwt.sign(tokenPayload, process.env.JWTSECRET, {
      expiresIn: "216000",
    });
  },
};
