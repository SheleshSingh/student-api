const { studentModel, studentValidate } = require("../models/studentModel.js");

// student create api

const studentCreate = async (req, res) => {
  const { name, email } = req.body;
  try {
    const { error } = studentValidate({ name, email });
    if (error) return res.status(500).json({ message: error.message });
    let student = await studentModel.findOne({ email });
    if (student) {
      return res.json({ message: "student already exist", success: false });
    }

    await studentModel.create({ name, email });
    res
      .status(201)
      .json({ message: "Student is created sucessfully", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// student all get
const studentGet = async (req, res) => {
  try {
    let students = await studentModel.find();
    res.json({ success: true, students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update student

const studentUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await studentModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!student) return res.status(404).json({ message: "Invalid student" });
    res
      .status(200)
      .json({ message: "student is updated successfully", student });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// student delete
const studentDelete = async (req, res) => {
  const { id } = req.params;
  let student = await studentModel.findOneAndDelete({ _id: id });
  if (!student) return res.status(404).json({ message: "Invalid Id" });
  res.json({ message: "Student delete successfully", student });
};

// student search api

const studentSearch = async (req, res) => {
  let student = await studentModel.find({
    $or: [{ name: { $regex: req.params.q } }],
  });
  res.send(student);
};

module.exports = {
  studentCreate,
  studentGet,
  studentDelete,
  studentUpdate,
  studentSearch,
};
