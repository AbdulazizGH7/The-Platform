const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    course: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Course', 
    },
    metrics: {
        difficulty: { type: Number, required: true },
        workload: { type: Number, required: true },
        resources: { type: Number, required: true }
    },
    description: { type: String, required: false },
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
