const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Course = require('../models/Course')
const Department = require('../models/Department');  
const Instructor = require('../models/Instructor');  
const User = require('../models/User');  
const Experience = require('../models/Experience');

router.get("/", async (req, res) =>{
    try{
        const courses = await Course.find().populate('prerequisites', 'courseCode')
        res.send(courses)
    }
    catch(err){
        console.log("Error fetching the courses", err)
    }
})

router.get("/:id", async (req, res) => {
    try {
      const courseId = req.params.id;
  
      // Ensure the `id` is valid
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ error: "Invalid course ID" });
      }
  
      const course = await Course.findById(courseId).populate('prerequisites', 'courseCode');
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      res.status(200).json(course);
    } catch (err) {
      console.error("Error fetching course:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

router.post('/', async (req, res) => {  
    try {  
        const { courseCode, courseName, description, instructors, department } = req.body;  

        // Validation checks  
        if (!courseCode || !courseName || !description || !department) {  
            return res.status(400).json({  
                success: false,  
                message: 'courseCode, courseName, department, and description are required fields'  
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


// Delete course by ID  
router.delete('/:id', async (req, res) => {  
    // Start a session for transaction  
    const session = await mongoose.startSession();  
    session.startTransaction();  

    try {  
        const courseId = req.params.id;  

        // Check if course exists  
        const course = await Course.findById(courseId);  
        if (!course) {  
            return res.status(404).json({ message: 'Course not found' });  
        }  

        // Remove course reference from Department collection  
        await Department.updateMany(  
            { courses: courseId },  
            { $pull: { courses: courseId } },  
            { session }  
        );  

        // Remove course reference from Instructor collection  
        await Instructor.updateMany(  
            { courses: courseId },  
            { $pull: { courses: courseId } },  
            { session }  
        );  

        // Remove course reference from User collection  
        await User.updateMany(  
            { courses: courseId },  
            { $pull: { courses: courseId } },  
            { session }  
        );  

        // Delete the course  
        await Course.findByIdAndDelete(courseId, { session });  

        // Commit the transaction  
        await session.commitTransaction();  

        res.status(200).json({   
            message: 'Course deleted successfully and removed from all references'   
        });  

    } catch (error) {  
        // If an error occurs, abort the transaction  
        await session.abortTransaction();  

        res.status(500).json({   
            message: 'Error deleting course',   
            error: error.message   
        });  
    } finally {  
        // End the session  
        session.endSession();  
    }  
});

router.put('/addExperience/:courseId', async (req, res) => {
    const { courseId } = req.params;
    const { metrics, description } = req.body;
  
    try {
      const newExperience = new Experience({ metrics, description });
      await newExperience.save();
  
      const course = await Course.findByIdAndUpdate(
        courseId,
        { $push: { experiences: newExperience._id } },
        { new: true }
      ).populate('experiences'); // Ensure experiences are populated.
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Ensure the backend is returning the populated experiences
      return res.status(200).json({ experiences: course.experiences }); // Return updated experiences
  
    } catch (err) {
      console.error('Error adding experience:', err);
      res.status(500).json({ message: 'Failed to add experience' });
    }
  });
  


    router.get("/:id/experiences", async (req, res) => {
        try {
          const courseId = req.params.id;
      
          // Ensure the `id` is valid
          if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ error: "Invalid course ID" });
          }
      
          const course = await Course.findById(courseId);
          if (!course) {
            return res.status(404).json({ error: "Course not found" });
          }
      
          res.status(200).json(course);
        } catch (err) {
          console.error("Error fetching course:", err);
          res.status(500).json({ error: "Internal server error" });
        }
      });

module.exports = router




module.exports = router