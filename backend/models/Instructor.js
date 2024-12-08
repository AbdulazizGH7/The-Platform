const mongoose = require('mongoose')

const instructorSchema = mongoose.Schema({
    name: String,
    img: String,
    courses:[{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    reviews:[{
        metrics:{
            Personality: Number,
            Teaching: Number,
            Grading: Number
        },
        review: String
    }]
})

const Instructor = mongoose.model("Instructor", instructorSchema)

module.exports = Instructor