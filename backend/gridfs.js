// // gridfs.js
// const GridFsStorage = require('multer-gridfs-storage');

const storage = null;
// const storage = new GridFsStorage({
//   url: process.env.DB_URL,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => ({
//     filename: `${Date.now()}-${file.originalname}`,
//     bucketName: 'uploads'
//   })
// });

module.exports = storage;
