// routes/uploads.js

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Resource = require('../models/Resource');
const File = require('../models/File'); // Ensure correct casing
const Course = require('../models/Course');

const router = express.Router();

// Configure multer storage (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload a file
router.post('/', upload.single('file'), async (req, res) => {
    console.log('File Object:', req.file); // Log file object details
    console.log('Request Body:', req.body); // Log request body details
    try {
        const { courseId, category } = req.body;

        if (!courseId || !category || !req.file) {
            console.log('Missing courseId, category, or file');
            return res.status(400).json({ error: 'Missing courseId, category, or file' });
        }

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            console.log(`Course not found with ID: ${courseId}`);
            return res.status(404).json({ error: 'Course not found' });
        }

        // Find or create the Resource document for this course + category
        let resource = await Resource.findOne({ course: course._id, category: category });
        if (!resource) {
            resource = new Resource({ course: course._id, category: category, files: [] });
            console.log(`Created new Resource for course: ${course._id}, category: ${category}`);
        }

        // Create a GridFS upload stream
        const uploadStream = req.app.locals.gfs.openUploadStream(`${Date.now()}-${req.file.originalname}`, {
            contentType: req.file.mimetype,
            metadata: {
                originalName: req.file.originalname,
                courseId: course._id,
                category: category,
            },
        });

        // Write the file buffer to GridFS
        uploadStream.end(req.file.buffer);

        uploadStream.on('error', async (err) => {
            console.error('Error uploading file to GridFS:', err);
            return res.status(500).json({ error: 'Error uploading file' });
        });

        uploadStream.on('finish', async () => {
            // Create a File document from GridFS file info
            const newFile = new File({
                name: req.file.originalname,
                type: req.file.mimetype,
                size: (req.file.size / 1024).toFixed(2) + ' KB',
                dateUploaded: new Date().toISOString().split('T')[0],
                gridfsId: uploadStream.id, // GridFS file's _id
                filename: uploadStream.filename,
            });
            await newFile.save();
            console.log(`Saved new File document with ID: ${newFile._id}`);

            // Add the file to the resource
            resource.files.push(newFile._id);
            await resource.save();
            console.log(`Added File ID: ${newFile._id} to Resource ID: ${resource._id}`);

            res.status(201).json({ message: 'File uploaded successfully', file: newFile });
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Download a file using gridfsId
router.get('/download/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Request ID:', id); // Log the ID received

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(`Invalid file ID: ${id}`);
            return res.status(400).json({ error: 'Invalid file ID' });
        }

        // Find the file in GridFS
        const files = await req.app.locals.gfs.find({ _id: new mongoose.Types.ObjectId(id) }).toArray();
        console.log('File Details:', files); // Log the files found

        if (!files || files.length === 0) {
            console.log(`File not found in GridFS with ID: ${id}`);
            return res.status(404).json({ error: 'File not found' });
        }

        res.set('Content-Type', files[0].contentType);
        res.set('Content-Disposition', `attachment; filename="${files[0].metadata.originalName}"`);

        // Create a download stream
        const downloadStream = req.app.locals.gfs.openDownloadStream(new mongoose.Types.ObjectId(id));

        downloadStream.pipe(res);

        downloadStream.on('error', (err) => {
            console.error('Download Stream error:', err);
            res.status(500).json({ error: 'Error downloading file' });
        });
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`DELETE request received for File ID: ${id}`);

        // Validate file ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(`Invalid File ID: ${id}`);
            return res.status(400).json({ error: 'Invalid file ID' });
        }

        // Find the File document to get gridfsId
        const fileDoc = await File.findById(id);
        if (!fileDoc) {
            console.log(`File document not found for ID: ${id}`);
            return res.status(404).json({ error: 'File document not found' });
        }
        console.log(`Found File document: ${JSON.stringify(fileDoc)}`);

        const gridfsId = fileDoc.gridfsId;
        console.log(`GridFS ID to delete: ${gridfsId}`);

        // Ensure gridfsId is an ObjectId
        let gridfsObjectId;
        try {
            gridfsObjectId = new mongoose.Types.ObjectId(gridfsId);
        } catch (err) {
            console.error('Invalid gridfsId:', gridfsId);
            return res.status(400).json({ error: 'Invalid gridfsId' });
        }

        // Delete the file from GridFS
        await req.app.locals.gfs.delete(gridfsObjectId);
        console.log(`Deleted file from GridFS with ID: ${gridfsObjectId}`);

        // Remove the File document
        const deletedFile = await File.findByIdAndDelete(id);
        if (!deletedFile) {
            console.log(`Failed to delete File document with ID: ${id}`);
            return res.status(500).json({ error: 'Failed to delete File document' });
        }
        console.log(`Deleted File document with ID: ${id}`);

        // Remove the file reference from any associated resources
        const updateResult = await Resource.updateMany(
            { files: id },
            { $pull: { files: id } }
        );
        console.log(`Removed file reference from resources for File ID: ${id}. Update Result:`, updateResult);

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        if (error instanceof mongoose.Error.CastError || error.message.includes('File not found')) {
            res.status(404).json({ error: 'File not found' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

module.exports = router;
