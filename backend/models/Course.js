const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseCode: String,
    courseName: String,
    description: String,
    prerequisites:[{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    instructors:[{
        type: mongoose.Types.ObjectId,
        ref: 'Instructor'
    }],
    experiences:[{
        type: mongoose.Types.ObjectId,
        ref: 'Experience'
    }],
    groups:[{
        type: mongoose.Types.ObjectId,
        ref: 'Group'
    }], 
})

const Course = mongoose.model("Course", courseSchema)

module.exports = Course