var mongoose = require('mongoose');

var ServiceOfferedSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    default: '',
    required: true
  },
  description: {
    type: String,
    default: '',
    required: true
  },

  serviceProvider: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider'
  }],

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

module.exports = mongoose.model('ServiceOffered', ServiceOfferedSchema);
