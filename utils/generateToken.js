const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign(data, "!@#$%^&*()");
};
module.exports = generateToken;
