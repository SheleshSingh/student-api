const express = require("express");
const userRouter = require("./routers/userRouter.js");
const studentRouter = require("./routers/studentRouter.js");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     methods: ["GET", "PUT", "DELETE", "POST"],
//     // Credential: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
mongoose
  .connect(
    "mongodb+srv://sheleshsingh755:3HirwL3YtjSWl3p7@cluster0.iioj7.mongodb.net/",
    {
      dbName: "STUDENT_PANEL",
    }
  )
  .then(() => console.log("mongoDb conecting sucessfully"))
  .catch((err) => console.log(err.message));
const PORT = 4000;
app.listen(PORT, () => console.log(`server is runnig ${PORT}`));
