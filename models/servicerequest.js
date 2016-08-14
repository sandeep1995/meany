var mongoose = require('mongoose');

var ServiceRequestSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceOffered'
  },
  description: {
    type: String
  },
  preferredSchedule: {
    type: String
  },
  amount: {
    type: String,
    default: ''
  },

  timeAllocated: {
    type: String,
    default: 'Pending'
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved'],
    default: 'Pending'
  },
  providerAllocated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider'
  },
  societyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Society',
      required: true
  }
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
