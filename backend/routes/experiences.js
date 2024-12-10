const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Course = require('../models/Course');
const Experience = require('../models/Experience');


router.get('/:courseId/experiences', async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('experiences');
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course.experiences); // Return experiences specific to this course
    } catch (err) {
        console.error('Error fetching experiences for course:', err);
        res.status(500).json({ message: 'Failed to fetch experiences for this course' });
    }
});


router.delete('/:experienceId', async (req, res) => {
    const { experienceId } = req.params;  // Just get experienceId from URL
  
    try {
      // Find and delete the experience by its ID
      const experience = await Experience.findByIdAndDelete(experienceId);
      
      if (!experience) {
        return res.status(404).json({ message: 'Experience not found' });
      }
  
      res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (err) {
      console.error('Error deleting experience:', err);
      res.status(500).json({ message: 'Failed to delete experience' });
    }
  });

// Get all experiences
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (err) {
        console.error("Error fetching experiences:", err);
        res.status(500).json({ message: "Failed to fetch experiences" });
    }
});

module.exports = router;
