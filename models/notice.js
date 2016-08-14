var mongoose = require('mongoose');
var NoticeSchema = mongoose.Schema({

    subject:{
        type: String,
        required: true
    },

    content:{
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: Date.now
    },
    reminderDate: {
        type: Date
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true  
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

module.exports = mongoose.model('Notice', NoticeSchema);