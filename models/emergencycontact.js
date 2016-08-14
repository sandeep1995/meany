var mongoose = require('mongoose');

var EmergencyContactSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },

    contacts: [{
        organization: {
            type: String,
            required: true
        },
        contactPhone: {
            type: String,
            required: true
        }
    }],

    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('EmergencyContact', EmergencyContactSchema);
