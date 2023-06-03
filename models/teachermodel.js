const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const teacherModel = mongoose.model("Teacher", teacherSchema);
module.exports = teacherModel;