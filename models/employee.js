var mongoose = require('mongoose');

var config = require('../config/main')[process.env.NODE_ENV || 'development'];
var awsRegion = config.aws.region;
var awsBucket = config.aws.imageBucketName;

var ResidentEmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    contactPhone: {
        type: String
    },
    role: {
        type: String
    },
    regularSchedule: {
        type: String
    },

    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    },

    approvalStatus: {
        type: String,
        enum: ["Approved", "Rejected", "Pending"],
        default: "Pending"
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

ResidentEmployeeSchema.virtual('awsProfilePicURL').get(function () {
  return 'https://'+awsRegion+'.amazonaws.com/'+awsBucket+'/' + this._id;
});

module.exports = mongoose.model("ResidentEmployee", ResidentEmployeeSchema);
