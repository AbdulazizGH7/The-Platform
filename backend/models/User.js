const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
      },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    groups: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    }]
  });
  
const User = mongoose.model("User", userSchema);

module.exports = User;