const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: Number,
    email: String,
    password: String,
    username: String,
    role: String,
    courses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
})

const User = mongoose.model("User", userSchema);

module.exports = User;