const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    departmentName: String,
    courses:[{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
})

const Department = mongoose.model("Department", departmentSchema)

module.exports = Department