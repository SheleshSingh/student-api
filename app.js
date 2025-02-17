const express = require("express");
const userRouter = require("./routers/userRouter.js");
const studentRouter = require("./routers/studentRouter.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connnectionDb = require("./config/db.js");

dotenv.config();
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

const PORT = 4000;
app.listen(PORT, () => {
  connnectionDb(), console.log(`server is runnig ${PORT}`);
});
