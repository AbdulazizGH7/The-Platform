const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({
    groupName: String,
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    groupMessages: [{
        senderId: { 
            type: mongoose.Types.ObjectId, 
            ref: 'User' 
        },
        message: { type: String},
        timestamp: { type: Date, default: Date.now }
    }]
})

const Group = mongoose.model("Group", groupSchema)

module.exports = Group