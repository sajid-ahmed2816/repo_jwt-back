const express = require("express");
const route = express.Router();
const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");

route.get("/", (req, res) => {
    res.send("handling get");
});

route.post("/signup", async (req, res) => {
    let { firstName, lastName, userName, email, password, contact } = req.body;
    let obj = { firstName, lastName, userName, email, password, contact }
    try {
        let arr = ["userName", "email", "password"]
        let errArr = [];

        arr.forEach((x) => {
            if (!obj[x]) {
                errArr.push(x);
            }
        })

        if (errArr.length > 0) {
            res.send({ status: false, data: errArr, message: "Required mentioned fields" }).status(400);
        }
        else {
            let hashPassword = await bcrypt.hash(obj.password, 10);
            obj.password = hashPassword;

            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                res.send({ status: false, data: null, message: "Email already exists" }).status(400);
            }
            else {
                userModel.create(obj)
                    .then((user) => {
                        res.send({ status: true, data: user, message: "Saved successfully" }).status(200);
                    })
                    .catch((err) => {
                        res.send({ status: false, data: err, message: "Internal server error" })
                    })

            };
        };
    }
    catch (e) {
        res.send({ status: false, data: null, message: "Internal server error" }).status(400);
    };
});

module.exports = route;