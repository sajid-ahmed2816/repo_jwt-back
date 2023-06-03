const express = require("express");
const userRoute = require("./routes/userroute");
const courseRoute = require("./routes/courseroute");
const studentRoute = require("./routes/studentroute");
const teacherRoute = require("./routes/teacherroute");
const instituteRoute = require("./routes/instituteroute");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/student", studentRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/institute", instituteRoute);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Database connect successfully and Server running on 5050")
        });
    })
    .catch((err) => {
        console.log(err);
    })