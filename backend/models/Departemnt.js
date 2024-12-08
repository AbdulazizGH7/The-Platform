const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    departmentName: String,
    courses: Array,
})

const Department = mongoose.model("Department", departmentSchema)

module.exports = Department