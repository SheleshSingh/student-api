const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  profileUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/protect");

const router = express.Router();
router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", protect, profileUser);

module.exports = router;
