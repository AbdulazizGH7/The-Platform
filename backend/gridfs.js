// gridfs.js

const { GridFsStorage } = require('multer-gridfs-storage'); // Import GridFsStorage
require('dotenv').config(); // Load environment variables

const storage = new GridFsStorage({
  url: process.env.DB_URL, // MongoDB connection string
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`, // Unique filename with a timestamp
      bucketName: 'uploads', // GridFS bucket name
    };
  },
});

module.exports = storage;
