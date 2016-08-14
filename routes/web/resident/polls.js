var User = require('../../../models/user');
var Poll = require('../../../models/opinionpoll');

var ObjectId=require('mongodb').ObjectId;

module.exports = {

  get: function(req, res){
    // var userId = req.session.user.id;
    var userId = ObjectId("5799ae6eb3b21ea20ff4e111");
    // var societyId = req.session.user.societyId;
    var societyId = new ObjectId("5799ae6eb3b21ea20ff4eaf5");
    Poll.find({
      // societyId: societyId
    }, function (err, polls) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Polls could not be found"
        });
      } else {
        console.log(polls);
        res.render('resident/polls', {
          error: false,
          title: 'Opinion Polls',
          data: polls,
          whoami: String(userId)  // id of currently logged in user
        });
      }
    });
  },

// Post the ** OPINION RESPONSE **
 post: function (req, res) {
  // var userId = req.session.user.id;
  var userId = new ObjectId("5799ae6eb3b21ea20ff4e111")
  var pollId = req.body.pollId;
  var optionSelected = Number(req.body.optionSelected);
  var responsedBy = userId;

  Poll.findDuplicateResponse(pollId, responsedBy, function (err, doc) {
    if (err) {
      return res.json({
        error: true,
        message: "Some Internal error occured"
      });
    } else {
      if (doc.length > 0) {
        return res.json({
          error: true,
          message: "Already Submitted the response"
        });
      } else {
        Poll.findByIdAndUpdate(pollId, {
          $push: {
            "responses": {
                optionSelected: optionSelected,
                responseTime: new Date(),
                responsedBy: userId
              }
          }
        }, {
          new: true
        }, function (err, poll) {
          if (err) {
            return res.json({
              error: true,
              message: "Could not be saved"
            });
          } else {
            res.json({
              error: false,
              message: "Successfully saved"
            });
          }
        });
      }
    }
  });

  }

};
