var mongoose = require('mongoose');

var ServiceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String
    },
    daysWorking: {
        type: String
    },
    workHours: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    }

});

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
