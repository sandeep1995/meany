var mongoose = require('mongoose');
var config = require('../config/main')[process.env.NODE_ENV || 'development'];

var awsRegion = config.aws.region;
var awsBucket = config.aws.imageBucketName;

var BoardMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  profilePicURL: {
    type: String
  },
  profilePicKey: {
    type: String
  },
  contactEmail: {
    type: String,
    lowercase: true
  },
  contactPhone: {
    type: String
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

BoardMemberSchema.virtual('awsProfilePicURL').get(function () {
  return 'https://'+awsRegion+'.amazonaws.com/'+awsBucket+'/' + this._id;
})

module.exports = mongoose.model("BoardMember", BoardMemberSchema);
