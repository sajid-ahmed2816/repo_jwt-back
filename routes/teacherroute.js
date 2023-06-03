const express = require("express");
const route = express.Router();
const teacherModel = require("../models/teachermodel");

route.get("/", async (req, res) => {
    try {
        let result = await teacherModel.find();
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
})

route.post("/", async (req, res) => {
    let { name, contact, course } = req.body;
    let obj = { name, contact, course };
    try {
        let arr = ["name", "contact", "course"];
        let errArr = [];

        arr.forEach((x) => {
            if (!obj[x]) {
                errArr.push(x);
            }
        });

        if (errArr.length > 0) {
            res.send({ status: false, data: errArr, message: "Required mentioned fields" }).status(400);
        }
        else {
            let teacher = new teacherModel(obj);
            await teacher.save();
            if (!teacher) {
                res.send({ status: false, data: null, message: "Internal server error" }).status(400);
            }
            else {
                res.send({ status: true, data: teacher, message: "Saved successffully" }).status(200);
            };
        };
    }
    catch (e) {
        res.send({ status: false }).status(400);
    };
});

module.exports = route;