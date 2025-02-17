const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 2, max: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6, max: 10 },
});
const userValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(10),
  });
  return schema.validate(data);
};

module.exports = {
  userModel: mongoose.model("User", userSchema),
  userValidate,
};
// module.exports = mongoose.model("userModel", userSchema);
