var mongoose = require('mongoose');
var ClassifiedSchema = new mongoose.Schema({
    isOffering: {
        type: Boolean,
        required: true
    },
    for: {
        type: String
    },
    category: {
        type: String
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    postAs: {
        type: String,
    },
    contactEmail: {
        type: String
    },
    contactPhone: {
        type: String
    },
    from: {
        type: Date,
        default: Date.now
    },
    validTill: {
        type: Date
    },
    pictureURLs: [String],
    description: {
        type: String
    },
    approvalStatus: {
      type: String,
      default: "Pending",
      enum: ["Approved", "Rejected", "Pending"]
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
    }
});

module.exports = mongoose.model("Classified", ClassifiedSchema);
