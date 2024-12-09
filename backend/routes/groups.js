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

module.exports = router;