var mongoose = require('mongoose');
var OpinionPollSchema = new mongoose.Schema({
    question: {
        type: String
    },

    pollCreatedDate: {
        type: Date,
        default: Date.now
    },

    pollCloseDate: {
        type: Date
    },

    options: [String],

    responses: [{
        optionSelected: Number,
        responseTime: {
            type: Date,
            default: Date.now
        },
        responsedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }],


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

OpinionPollSchema.statics.findDuplicateResponse = function (pollId, responsedBy, cb) {
    this.find({"_id": pollId, "responses.responsedBy": responsedBy}, cb);
};

module.exports = mongoose.model("OpinionPoll", OpinionPollSchema);