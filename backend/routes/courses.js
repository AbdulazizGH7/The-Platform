const express = require('express')
const Course = require('../models/Course')
const router = express.Router()

router.get("/", async (req, res) =>{
    try{
        const courses = await Course.find().populate('prerequisites', 'courseCode')
        res.send(courses)
    }
    catch(err){
        console.log("Error fetching the courses", err)
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
        console.log("Error fetching the course", err)
    }
})

router.post('/', async (req, res) => {  
    try {  
        const { courseCode, courseName, description, instructors } = req.body;  

        // Validation checks  
        if (!courseCode || !courseName || !description) {  
            return res.status(400).json({  
                success: false,  
                message: 'courseCode, courseName, and description are required fields'  
            });  
        }  

        // Check if courseName or description is empty (after trimming whitespace)  
        if (courseName.trim() === '' || description.trim() === '') {  
            return res.status(400).json({  
                success: false,  
                message: 'courseName and description cannot be empty'  
            });  
        }  

        // Check if course with same courseCode already exists  
        const existingCourse = await Course.findOne({ courseCode: courseCode.toUpperCase() });  
        if (existingCourse) {  
            return res.status(409).json({  
                success: false,  
                message: 'A course with this courseCode already exists'  
            });  
        }  

        // Create new course  
        const newCourse = new Course({  
            courseCode: courseCode.toUpperCase(),  
            courseName: courseName.trim(),  
            description: description.trim(),  
            instructors: instructors || [],  
            prerequisites: [],  
            experiences: [],  
            groups: []  
        });  

        // Save the course  
        await newCourse.save();  

        res.status(201).json({  
            success: true,  
            message: 'Course created successfully',  
            data: newCourse  
        });  

    } catch (error) {  
        console.error('Error creating course:', error);  
        res.status(500).json({  
            success: false,  
            message: 'Internal server error',  
            error: error.message  
        });  
    }  
});

router.delete('/:id', async (req, res) => {  
    try {  
        const courseId = req.params.id;  

        // Check if course exists  
        const course = await Course.findById(courseId);  
        if (!course) {  
            return res.status(404).json({ message: 'Course not found' });  
        }  

        // Delete the course  
        await Course.findByIdAndDelete(courseId);  

        res.status(200).json({ message: 'Course deleted successfully' });  
    } catch (error) {  
        res.status(500).json({   
            message: 'Error deleting course',   
            error: error.message   
        });  
    }  
});  

module.exports = router