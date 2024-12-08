const express = require('express')
const Course = require('../models/Course')
const router = express.Router()

router.get("/", async (req, res) =>{
    try{
        const courses = await Course.find().populate('prerequisites', 'courseCode')
        res.send(courses)
    }
    catch(err){
        console.log("Error fetching the departments", err)
    }
})

router.get("/:id", async (req, res) =>{
    try{
        const courseId = req.params.id;
        if(courseId.length <24){
            return res.status(404).send({ error: "Course not found" })
        }
        const course = await Course.findById(courseId).populate('prerequisites', 'courseCode')
        if (!course) {
            return res.status(404).send({ error: "Course not found" });
        }
        res.send(course)
    }
    catch(err){
        console.log("Error fetching the departments", err)
    }
})

module.exports = router