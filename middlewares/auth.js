const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authentication = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.json({ message: "Login first" });
  const decoded = jwt.verify(token, "!@#$%^&*()");
  const id = decoded.userId;
  let user = await userModel.find(id);
  if (!user) return res.json({ message: "User not exist" });
  req.user = user;
  next();
};
module.exports = authentication;
