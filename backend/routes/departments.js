const express = require('express')
const Department = require('../models/Department')
const router = express.Router()

router.get("/", async (req, res) =>{
    try{
        const departments = await Department.find().populate('courses', 'courseCode courseName')
        res.send(departments)
    }
    catch(err){
        console.log("Error fetching the departments", err)
    }
})

module.exports = router