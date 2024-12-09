const express = require('express')
const Group = require('../models/Group')
const Course = require('../models/Course')
const router = express.Router()


// GET group by ID
// GET all groups for a course
router.get("/:courseId", async (req, res) => {
    try {
        const courseId = req.params.courseId;

        // Validate the course ID length
        if (courseId.length < 24) {
            return res.status(404).send({ error: "Invalid Course ID" });
        }

        // Fetch the course by ID
        const course = await Course.findById(courseId).populate('groups', 'groupName')
        if (!course) {
            return res.status(404).send({ error: "Course not found" });
        }

        res.send(course);
    } catch (err) {
        console.error("Error fetching groups for the course", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.post('/create1', async (req,res) =>{
    const newGroup = new Group({
        groupName: req.body.groupName,
        members:req.body.members,
    })
    await newGroup.save()
    res.send("Ok")
})

// router.get('/masseges/:groupId', async (req, res) => {     
//     try {         
//         const groupId = req.params.groupId;          
        
//         // Alternative approach: directly find messages with populated sender
//         const groupMessages = await Group.findById( groupId )
        
        
//         // if (!groupMessages || groupMessages.length === 0) {             
//         //     return res.status(404).json({ message: 'No messages found for this group' });         
//         // }          
        
//         res.json(groupMessages);     
//     } catch (err) {         
//         console.error('Error fetching group messages:', err);         
//         res.status(500).json({ message: 'Internal Server Error' });     
//     } 
// });

// GET route to fetch messages for a specific group
router.get('/masseges/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;

        // Find the group and populate the senderId in groupMessages
        const group = await Group.findById(groupId)
            .select('groupMessages') // Select only the groupMessages field
            .populate({
                path: 'groupMessages.senderId',
                select: 'username' // Specify which user fields you want to include
            });

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json(
          group.groupMessages
        );

    } catch (error) {
        console.error('Error fetching group messages:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching group messages',
            error: error.message
        });
    }
});

module.exports = router;