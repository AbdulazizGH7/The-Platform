// routes/resources.js
const express = require('express');
const Resource = require('../models/Resource');
const Course = require('../models/Course');

const router = express.Router();

// GET /resources/:courseCode - fetch all resources for a given course code
router.get('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        // Find all resources for this course _id
        const resources = await Resource.find({ course: courseId }).populate('files');
        res.json(resources);
      } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ error: 'Server error' });
      }
    });

// GET /resources/:courseCode/:category - fetch files for a specific category
router.get('/:id/:category', async (req, res) => {
  const { courseCode, category } = req.params;

  const course = await Course.findOne({ courseCode: courseCode });
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  const resource = await Resource.findOne({ course: course._id, category: category }).populate('files');
  if (!resource) {
    return res.status(404).json({ error: 'No resources found for this category' });
  }

  res.status(200).json(resource);
});

module.exports = router;
