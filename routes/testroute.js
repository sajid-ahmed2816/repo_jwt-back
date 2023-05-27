const express = require("express");
const route = express.Router();
const testModel = require("../models/testmodel");

route.get("/", (req, res) => {
    res.send("handling get");
});

route.post("/", async (req, res) => {
    let { firstName, lastName, userName, email, password, contact } = req.body;
    try {
        let errArr = [];
        if (!firstName) {
            errArr.push("required : First Name");
        }
        if (!lastName) {
            errArr.push("required : last Name");
        }
        if (!userName) {
            errArr.push("required : User Name");
        }
        if (!email) {
            errArr.push("required : Email");
        }
        if (!password) {
            errArr.push("required : Password");
        }
        if (!contact) {
            errArr.push("required : Contact");
        }
        if (errArr.length > 0) {
            res.send({ status: false, data: errArr, message: "Required all mentioned fields" }).status(400);
        }
        else {
            let obj = { firstName, lastName, userName, email, password, contact };
            let test = new testModel(obj);
            await test.save()
            if (!test) {
                res.send({ status: false, data: null, message: "Internal server error" }).status(400);
            }
            else {
                res.send({ status: true, data: test, message: "Saved successfully" }).status(200);
            };
        };
    }
    catch (e) {
        res.send({ status: false, data: null, message: "Internal server error" }).status(400);
    };
});

module.exports = route;