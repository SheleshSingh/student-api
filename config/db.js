const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://sheleshsingh755:3HirwL3YtjSWl3p7@cluster0.iioj7.mongodb.net/"
// );

// sheleshsingh755;

// 3HirwL3YtjSWl3p7

const connnectionDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "STUDENT_PANEL",
    })
    .then(() => console.log("mongoDb conecting sucessfully"))
    .catch((err) => console.log(err.message));
};

module.exports = connnectionDb;
