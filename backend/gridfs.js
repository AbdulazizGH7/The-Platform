// gridfs.js
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config(); // ensure DB_URL is available

const storage = new GridFsStorage({
  url: process.env.DB_URL, 
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    // Customize the filename; here we just prepend a timestamp
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'uploads' // This defines the bucket (collection) name in GridFS
    };
  }
});

module.exports = storage;
