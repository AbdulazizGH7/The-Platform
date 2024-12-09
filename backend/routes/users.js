const express = require('express');  
const router = express.Router();  
const Course = require('../models/Course');
const Group = require('../models/Group'); // Adjust path as needed  
const User = require('../models/User'); // Adjust path as needed  

// Route to get course codes for an array of course IDs  
router.post('/courses', async (req, res) => {  
    try {  
        // Get the array of course IDs from request body  
        const { coursesIds } = req.body;

        // Validate if courseIds is provided and is an array  
        if (!coursesIds || !Array.isArray(coursesIds)) {  
            return res.status(400).json({  
                success: false,  
                message: 'Please provide an array of course IDs' 
            });  
        }  

        // Find all courses with the provided IDs and select only courseCode  
        const courses = await Course.find({  
            _id: { $in: coursesIds }  
        }).select('courseCode');  

        res.status(200).json({  
            success: true,  
            courses  
        });  

    } catch (error) {  
        console.error('Error fetching course codes:', error);  
        res.status(500).json({  
            success: false,  
            message: 'Error fetching course codes',  
            error: error.message  
        });  
    }  
});

// Route to get course codes for an array of course IDs  
router.post('/groups', async (req, res) => {  
    try {  
        // Get the array of course IDs from request body  
        const { groupsIds } = req.body;

        // Validate if courseIds is provided and is an array  
        if (!groupsIds  || !Array.isArray(groupsIds )) {  
            return res.status(400).json({  
                success: false,  
                message: 'Please provide an array of group IDs' 
            });  
        }  

        // Find all courses with the provided IDs and select only courseCode  
        const groups = await Group.find({  
            _id: { $in: groupsIds  }  
        }).select('groupName');  

        res.status(200).json({  
            success: true,  
            groups  
        });  

    } catch (error) {  
        console.error('Error fetching group names:', error);  
        res.status(500).json({  
            success: false,  
            message: 'Error fetching group names:',  
            error: error.message  
        });  
    }  
}); 

// PUT route to add a course to user's coursess array  
router.put('/addCourse', async (req, res) => {  
    try {   
        const { courseId, userId } = req.body;  

        // Input validation  
        if (!courseId) {  
            return res.status(400).json({ message: 'Course ID is required' });  
        }  

        // Find user and update courses array  
        const updatedUser = await User.findByIdAndUpdate(  
            userId,  
            { $addToSet: { courses: courseId } }, // $addToSet prevents duplicate entries  
            { new: true, runValidators: true }  
        );  

        if (!updatedUser) {  
            return res.status(404).json({ message: 'User not found' });  
        }  

        res.status(200).json({  
            message: 'Course added successfully',  
            user: updatedUser  
        });  

    } catch (error) {  
        console.error('Error adding course to user:', error);  
        res.status(500).json({   
            message: 'Error adding course to user',  
            error: error.message   
        });  
    }  
});

router.put('/addGroup', async (req, res) => {
    try {
        const { groupId, userId } = req.body;

        // Input validation
        if (!groupId) {
            return res.status(400).json({ message: 'Group ID is required' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find group and update members array
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } }, // $addToSet prevents duplicate entries
            { new: true, runValidators: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Optionally, you can update the User's groups array if needed
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { groups: groupId } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User added to group successfully',
            group: updatedGroup,
            user: updatedUser
        });

    } catch (error) {
        console.error('Error adding user to group:', error);
        res.status(500).json({
            message: 'Error adding user to group',
            error: error.message
        });
    }
});


module.exports = router;  