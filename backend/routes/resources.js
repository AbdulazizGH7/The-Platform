// routes/resources.js

const express = require('express');
const mongoose = require('mongoose');
const Resource = require('../models/Resource');
const Course = require('../models/Course');

const router = express.Router();

/**
 * GET /api/resources/:courseId/:category
 * Fetch a specific resource for a given course ID and category
 */
router.get('/:courseId/:category', async (req, res) => {
    try {
      const { courseId, category } = req.params;
  
      // Validate courseId
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ error: 'Invalid course ID' });
      }
  
      // Fetch the resource from the database
      const resource = await Resource.findOne({ course: courseId, category }).populate('files');
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
  
      res.status(200).json(resource);
    } catch (error) {
      console.error('Error fetching resources:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * GET /api/resources/:id
 * Fetch all resources for a given course ID
 */
router.get('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        // Validate courseId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
          return res.status(400).json({ error: 'Invalid course ID' });
        }
        // Find all resources for this course _id
        const resources = await Resource.find({ course: courseId }).populate('files');
        res.json(resources);
      } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ error: 'Server error' });
      }
});

module.exports = router;
