const express = require("express");
const route = express.Router();
const courseModel = require("../models/coursemodel");

route.get("/", async (req, res) => {
    try {
        const result = await courseModel.find();
        if (!result) {
            res.send({ status: false, data: null, message: "No data found" }).status(400);
        }
        else {
            res.send({ status: true, data: result }).status(200);
        }
    }
    catch (e) {
        res.send({ status: false, }).status(400);
    };
});

route.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const result = await courseModel.findById(id);
        if (!result) {
            res.send({ status: false, data: null, message: "No data found" }).status(400);
        }
        else {
            res.send({ status: true, data: result }).status(200);
        }
    }
    catch (e) {
        res.send({ status: false, }).status(400);
    }
});

route.get("/search", async (req, res) => {
    try {
        let { courseName } = req.body;
        if (courseName) {
            let result = await courseModel.find({ courseName });
            if (!result) {
                res.send({ status: false, data: null, message: "No data found" }).status(400);
            }
            else {
                res.send({ status: true, data: result }).status(200);
            }
        }
    }
    catch (e) {
        res.send({ status: false, }).status(400);
    }
});

route.post("/", async (req, res) => {
    let { courseName, duration, fees, shortName } = req.body;
    let obj = { courseName, duration, fees, shortName };
    try {
        let arr = ["courseName", "duration", "fees"];
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
            let course = new courseModel(obj);
            await course.save();
            if (!course) {
                res.send({ status: false, data: null, message: "Internal server error" }).status(400);
            }
            else {
                res.send({ status: true, data: course, message: "Saved successfully" }).status(200);
            }
        }
    }
    catch (e) {
        res.send({ status: false, data: null, message: "Internal server error" }).status(400);
    }
});

route.put("/:id", async (req, res) => {
    let id = req.params.id;
    let { courseName, duration, fees, shortName } = req.body;
    let obj = { courseName, duration, fees, shortName };

    try {
        let result = await courseModel.findById(id);
        if (!result) {
            res.send({ status: false, data: null, message: "No data found" }).status(400);
        }
        else {
            let updatedResult = await courseModel.findByIdAndUpdate(id, obj, { new: true });
            if (!updatedResult) {
                res.send({ status: false, data: null, message: "Internal server error" }).status(400);
            }
            else {
                res.send({ status: true, data: updatedResult, message: "Updated successfully" }).status(200);
            }
        }
    }
    catch (e) {
        res.send({ status: false, }).status(400);
    }
});

route.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let result = await courseModel.findById(id);
        if (!result) {
            res.send({ status: false, data: null, message: "No data found" }).status(400);
        }
        else {
            let delResult = await courseModel.findByIdAndDelete(id);
            if (!delResult) {
                res.send({ status: false, data: null, message: "Internal server error" }).status(400);
            }
            else {
                res.send({ status: true, data: null, message: "Deleted successfully" }).status(200);
            }
        }
    }
    catch (e) {
        res.send({ status: false, }).status(400);
    }
});

module.exports = route;