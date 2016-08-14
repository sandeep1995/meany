var User = require('../../../models/user');
var Poll = require('../../../models/opinionpoll');

module.exports = {


  get: function (req, res) {
    var societyId = req.session.user.societyId;
    Poll.find({
      societyId: societyId
    }, function (err, polls) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Polls could not be found"
        });
      } else {
        console.log(polls);
        res.render('admin/polls', {
          error: false,
          title: 'Opinion Polls',
          data: polls
        });
      }
    });
  },

  post: function (req, res) {
    console.log(req.body);
    var data = req.body;
    data.societyId = req.session.user.societyId;
    data.addedBy =  req.session.user.id;;
    var poll = new Poll(data);
    poll.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Fill the mandatory fields"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: poll.id
          }
        });
      }
    });
  },


}
