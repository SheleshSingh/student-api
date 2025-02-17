const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protect = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const data = jwt.verify(req.cookies.token, "!@#$%^&*()");
      req.user = await userModel
        .findOne({ email: data.email })
        .select("-password");
      next();
    } catch (err) {
      res.status(401).json({ message: "Not Authorized", success: false });
    }
  }
  if (!req.cookies.token) {
    res
      .status(401)
      .json({ message: "Not Authorized, You don't permission to access.." });
  }
};
module.exports = protect;
