var mongoose = require('mongoose');

var FrequentVisitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactPhone:{
    type: String
  },
  expiryDate: {
    type: Date
  },
  token: {
    type: String
  },
  societyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
    required: true
  },

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("FrequentVisitor", FrequentVisitorSchema);
