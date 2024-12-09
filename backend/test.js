require('dotenv').config();  // for environment variables
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');

console.log("DB_URL in test.js:", process.env.DB_URL); // Verify DB_URL is correct

const storage = new GridFsStorage({
  url: process.env.DB_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: 'uploads'
  })
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
