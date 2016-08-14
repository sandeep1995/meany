var mongoose = require('mongoose');
var ResidentDocumentSchema = new mongoose.Schema({

    docType: {
        type: String,
        required: true
    },

    note: {
        type: String
    },

    uploadDateTime: {
        type: Date,
        default: Date.now
    },

    userDocKey: {
        type: String
    },

    userDocURL: {
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
        require: true
    },

    aws: {
      key: String,
      bucket: String,
      fileName: String // the original file name
    }
});

module.exports = mongoose.model("ResidentDocument", ResidentDocumentSchema);
