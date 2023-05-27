const express = require("express");
const testRoute = require("./routes/testroute");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/test", testRoute);


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