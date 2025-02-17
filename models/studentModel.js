const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = mongoose.Schema({
  name: { type: String, required: true, min: 2, max: 50 },
  email: { type: String, required: true, unique: true },
});
const studentValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(20),
    email: Joi.string().required().email(),
  });
  return schema.validate(data);
};

module.exports = {
  studentModel: mongoose.model("Student", studentSchema),
  studentValidate,
};
