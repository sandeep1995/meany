var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var config = require('../config/main')[process.env.NODE_ENV || 'development'];
var awsRegion = config.aws.region;
var awsBucket = config.aws.imageBucketName;

var UserSchema = new mongoose.Schema({

    role: {
        type: String,
        enum: ['Resident', 'Admin', 'Super Admin'],
        default: 'Resident'
    },

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    contactEmail: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },

    contactPhone: {
        type: String
    },

    contactPhoneAlter: {
        type: String
    },

    block: {
        type: String,
        default: ''
    },

    flatNo: {
        type: String,
        default: ''
    },

    profession: {
        type: String,
        default: ''
    },

    organization: {
        type: String,
        default: ''
    },

    designation: {
        type: String,
        default: ''
    },

    carNumber1: {
        type: String,
        default: ''
    },
    parkingSpace1: {
        type: String,
        default: ''
    },
    carNumber2: {
        type: String,
        default: ''

    },
    parkingSpace2: {
        type: String,
        default: ''
    },

    carNumber3: {
        type: String,
        default: ''
    },
    parkingSpace3: {
        type: String,
        default: ''
    },
    profilePicURL: {
        type: String,
        default: ''
    },

    profilePicKey: {
        type: String,
        default: ''
    },

    isProfilePrivate: {
        type: Boolean,
        default: false,

    },

    myServices: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceOffered'
    }],

    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: function(){
            if (this.role == 'Resident' || this.role == 'Admin' )
                return true;
            else if (this.role == 'Super Admin')
                return false;
        }
    }

});



// Save user's hashed password
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function () {

            }, function (err, hash) {
                if (err) {
                    return next(err);
                }
                // saving actual password as hash
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// compare two password

UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.virtual('awsProfilePicURL').get(function () {
  return 'https://'+awsRegion+'.amazonaws.com/'+awsBucket+'/' + this._id;
})

module.exports = mongoose.model('User', UserSchema);
