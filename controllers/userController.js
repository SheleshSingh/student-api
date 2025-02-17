const { userModel, userValidate } = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

// create user api
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { error } = userValidate({ name, email, password });
    if (error) return res.json({ message: error.message });
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({ message: "User already exist", success: false });
    }
    let salt = await bcrypt.genSalt(10);
    let hashPass = await bcrypt.hash(password, salt);
    await userModel.create({ name, password: hashPass, email });

    let token = generateToken({ email });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User successfully created",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login user api

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ message: "Email or Password Incorrect", success: false });
    }
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = generateToken({ email });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res
        .status(201)
        .json({ message: "User login successfully", success: true });
    } else {
      return res
        .status(500)
        .json({ message: "Email or Password Incorrect", success: false });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// logout user

const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ message: "User logout successfully", success: true });
};

// profile user

const profileUser = (req, res) => {
  // console.log(req.user);
  res.json({ message: "loggedin ho aap", success: true });
};
module.exports = { createUser, loginUser, logoutUser, profileUser };
