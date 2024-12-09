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

router.put('/addCourse', async (req, res) => {  
    try {  
        const { departmentName, courseId } = req.body;  

        // Validation checks  
        if (!departmentName || !courseId) {  
            return res.status(400).json({  
                success: false,  
                message: 'departmentName and courseId are required'  
            });  
        }  

        // Find and update the department  
        const department = await Department.findOne({ departmentName });  

        if (!department) {  
            return res.status(404).json({  
                success: false,  
                message: 'Department not found'  
            });  
        }  

        // Check if course is already in the department  
        if (department.courses.includes(courseId)) {  
            return res.status(400).json({  
                success: false,  
                message: 'Course is already assigned to this department'  
            });  
        }  

        // Add the course to the department  
        department.courses.push(courseId);  
        await department.save();  

        res.status(200).json({  
            success: true,  
            message: 'Department updated successfully',  
            data: department  
        });  

    } catch (error) {  
        console.error('Error updating department:', error);  
        res.status(500).json({  
            success: false,  
            message: 'Internal server error',  
            error: error.message  
        });  
    }  
});  

module.exports = router