const express = require("express");
const {
  studentCreate,
  studentGet,
  studentDelete,
  studentUpdate,
  studentSearch,
} = require("../controllers/studentController");
const router = express.Router();

router.post("/", studentCreate);
router.get("/", studentGet);
router.put("/:id", studentUpdate);
router.delete("/:id", studentDelete);
router.get("/:q", studentSearch);

module.exports = router;
