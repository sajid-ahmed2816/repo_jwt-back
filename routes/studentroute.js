const express = require("express");
const route = express.Router();
const studentModel = require("../models/studentmodel");
const bcrypt = require("bcrypt");

route.get("/", async (req, res) => {
    try {
        let result = await studentModel.find();
        if (!result) {
            res.send({ status: false, data: null, message: "No data found" }).status(400);
        }
        else {
            res.send({ status: true, data: result }).status(200);
        }
    }
    catch (e) {
        res.send({ status: false }).status(400);
    }
});

route.post("/", async (req, res) => {
    let { firstName, lastName, contact, email, password } = req.body;
    let obj = { firstName, lastName, contact, email, password };
    try {
        let arr = ["firstName", "lastName", "contact", "email", "password"];
        let errArr = []

        arr.forEach((x) => {
            if (!obj[x]) {
                errArr.push(x)
            }
        })

        if (errArr.length > 0) {
            res.send({ status: false, data: errArr, message: "Required mentioned fields" }).status(400);
        }
        else {
            let hashPassword = await bcrypt.hash(obj.password, 10);
            obj.password = hashPassword;
            let student = new studentModel(obj);
            await student.save();
            if (!student) {
                res.send({ status: false, data: null, message: "Internal server error" }).status(400);
            }
            else {
                res.send({ status: true, data: student, message: "Saved successfully" }).status(200);
            }
        }
    }
    catch (e) {
        res.send({ status: false }).status(400);
    }
});

module.exports = route;
