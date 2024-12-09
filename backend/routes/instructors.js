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

router.put('/addCourse', async (req, res) => {  
    try {  
        const { instructorsId, courseId } = req.body;  

        // Validation checks  
        if (instructorsId.length < 1 || !courseId || !Array.isArray(instructorsId)) {  
            return res.status(400).json({  
                success: false,  
                message: 'instructorsId array and courseId are required'  
            });  
        }  

        // Find all instructors that need to be updated  
        const instructors = await Instructor.find({  
            _id: { $in: instructorsId }  
        });  

        // Check if all instructors were found  
        if (instructors.length !== instructorsId.length) {  
            return res.status(404).json({  
                success: false,  
                message: 'One or more instructors not found'  
            });  
        }  

        // Update each instructor  
        const updatePromises = instructors.map(async (instructor) => {  
            // Check if course is already in instructor's courses  
            if (!instructor.courses.includes(courseId)) {  
                instructor.courses.push(courseId);  
                return instructor.save();  
            }  
            return instructor;  
        });  

        // Wait for all updates to complete  
        const updatedInstructors = await Promise.all(updatePromises);  

        res.status(200).json({  
            success: true,  
            message: 'Instructors updated successfully',  
            data: updatedInstructors  
        });  

    } catch (error) {  
        console.error('Error updating instructors:', error);  
        res.status(500).json({  
            success: false,  
            message: 'Internal server error',  
            error: error.message  
        });  
    }  
});    

module.exports = router