var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['General', 'Complaints', 'Suggestion'],
        default: 'General'
    },

    subject: {
        type: String
    },

    messages: [{
        dateTime: {
            type: Date,
            default: Date.now
        },
        message: {
            type: String
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],

    status: {
        type: String,
        enum: ['In Progress', 'Closed'],
        default: 'In Progress'
    },

    dateOpened: {
        type: Date,
        default: Date.now
    },

    openedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true  
    }
});

module.exports = mongoose.model('Contact', ContactSchema);