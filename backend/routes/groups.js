const express = require('express')
const Group = require('../models/Group')
const Course = require('../models/Course')
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose')


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

router.post('/create1', async (req, res) => {
    try {
        const { groupName, courseId } = req.body;

        // Validate courseId
        if (!courseId || courseId.length < 24) {
            return res.status(400).json({ error: "Invalid Course ID" });
        }

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Create a new group
        const newGroup = new Group({
            groupName,
            members: [], // Initialize with an empty members list
        });

        // Save the group
        const savedGroup = await newGroup.save();

        // Add the group to the course's groups array
        course.groups.push(savedGroup._id);
        await course.save();

        res.status(201).json({ group: savedGroup, message: "Group created successfully!" });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete group by ID  
router.delete('/:id', async (req, res) => {  
    // Start a session for transaction  
    const session = await mongoose.startSession();  
    session.startTransaction();  

    try {  
        const groupId = req.body.id;  

        // Check if course exists  
        const group = await Group.findById(groupId);  
        if (!group) {  
            return res.status(404).json({ message: 'group not found' });  
        }  

        

        // Remove group reference from User collection  
        await User.updateMany(  
            { groups: groupId },  
            { $pull: { groups: groupId } },  
            { session }  
        );  
        
        await Course.updateMany(  
            { groups: groupId },  
            { $pull: { groups: groupId } },  
            { session }  
        ); 

        // Delete the group  
        await Group.findByIdAndDelete(groupId, { session });  

        // Commit the transaction  
        await session.commitTransaction();  

        res.status(200).json({   
            message: 'group deleted successfully and removed from all references'   
        });  

    } catch (error) {  
        // If an error occurs, abort the transaction  
        await session.abortTransaction();  

        res.status(500).json({   
            message: 'Error deleting group',   
            error: error.message   
        });  
    } finally {  
        // End the session  
        session.endSession();  
    }  
});


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


router.post('/announcement', async (req, res) => {
    try {
        const { groupId, announcement, senderId } = req.body;


        // Validate `groupId` and `senderId`
        if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).json({ error: "Invalid groupId or senderId." });
        }

        // Find the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found." });
        }

        // Create a new announcement
        const newAnnouncement = {
            senderId,
            message: announcement,
            timestamp: new Date(),
        };

        // Add the announcement to the group's messages
        group.groupMessages.push(newAnnouncement);
        await group.save();

        // Populate the sender's information for the last message
        await group.populate({
            path: 'groupMessages.senderId',
            select: 'username', // Only include necessary fields
        });

        // Get the last added message
        const savedAnnouncement = group.groupMessages[group.groupMessages.length - 1];

        res.status(201).json({
            message: "Announcement published successfully!",
            announcement: savedAnnouncement,
        });
    } catch (error) {
        console.error("Error adding announcement:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
});



module.exports = router;