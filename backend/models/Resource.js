const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  category: { 
    type: String, 
    enum: ['oldExams', 'notes', 'quizzes', 'other'], 
    required: true 
  },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
});

module.exports = mongoose.model('Resource', resourceSchema);
