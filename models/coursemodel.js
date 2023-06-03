const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
    }
});

const courseModel = mongoose.model("Course", courseSchema);
module.exports = courseModel;