// routes/uploads.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Resource = require('../models/Resource');
const File = require('../models/file');
const storage = require('../gridfs');

const router = express.Router();
const upload = multer({ storage });

// Expecting formData with: courseCode, category, file
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { courseCode, category } = req.body;

    if (!courseCode || !category || !req.file) {
      return res.status(400).json({ error: 'Missing courseCode, category, or file' });
    }

    // Find the course by courseCode (case-sensitive or insensitive as needed)
    const course = await Course.findOne({ courseCode: courseCode });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Find or create the Resource document for this course and category
    let resource = await Resource.findOne({ course: course._id, category: category });
    if (!resource) {
      resource = new Resource({ course: course._id, category: category, files: [] });
    }

    // Create a File document for the uploaded file
    const newFile = new File({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: (req.file.size / 1024).toFixed(2) + ' KB',
      dateUploaded: new Date().toISOString().split('T')[0],
      gridfsId: req.file.id,
      filename: req.file.filename
    });

    await newFile.save();

    // Add file reference to the resource
    resource.files.push(newFile._id);
    await resource.save();

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
