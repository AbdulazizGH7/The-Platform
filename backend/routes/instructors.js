const express = require('express')
const Instructor = require('../models/Instructor')
const router = express.Router()

router.get("/", async (req, res) =>{
    try{
        const instructors = await Instructor.find()
        res.send(instructors)
    }
    catch(err){
        console.log("Error fetching the instructors", err)
    }
})

module.exports = router