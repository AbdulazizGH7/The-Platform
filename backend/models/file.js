const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: String,
  dateUploaded: String,
  gridfsId: mongoose.Schema.Types.ObjectId,
  filename: String
});

module.exports = mongoose.model('File', fileSchema);
