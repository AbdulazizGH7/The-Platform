// models/File.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  dateUploaded: { type: String, required: true },
  gridfsId: { type: mongoose.Schema.Types.ObjectId, required: true },
  filename: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
