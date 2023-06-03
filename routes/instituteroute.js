const express = require("express");
const route = express.Router();
const instituteModel = require("../models/institutemodel");

route.get("/", async (req, res) => {
    try {
        let result = await instituteModel.find();
        if (!result) {
            res.send({ status: false, data: null, message: "No data found" }).status(400);
        }
        else {
            res.send({ status: true, data: result }).status(200);
        };
    }
    catch (e) {
        res.send({ status: false }).status(400);
    };
});

route.post("/", async (req, res) => {
    let { name, address, shortName, tel } = req.body;
    let obj = { name, address, shortName, tel };
    try {
        let arr = ["name", "address", "tel"];
        let errArr = [];

        arr.forEach((x) => {
            if (!obj[x]) {
                errArr.push(x);
            };
        });

        if (errArr.length > 0) {
            res.send({ status: false, data: errArr, message: "Required mentioned fields" }).status(400);
        }
        else {
            let institute = new instituteModel(obj);
            await institute.save();
            if (!institute) {
                res.send({ status: false, data: null, message: "Internal server error" }).status(400);
            }
            else {
                res.send({ status: true, data: institute, message: "Saved successfully" }).status(400);
            };
        };
    }
    catch (e) {
        res.send({ status: false }).status(400);
    }
});

module.exports = route;