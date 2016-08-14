var Notice = require('../../../models/notice');
var moment = require('moment');

module.exports = {
  get: function (req, res) {
  var societyId = req.session.user.societyId;
  console.log(societyId);
    Notice.find({
      "societyId": societyId
    }, function (err, notices) {
      if (err) {
        console.log(err);
        return res.render('resident/notice', {
          error: true,
          message: "No notices found"
        });
      } else {
        var noticesMap = notices.map(function (notice) {
          var rObj = {};
          rObj['_id'] = notice._id;
          rObj['subject'] = notice.subject;
          rObj['content'] = notice.content;
          rObj['dateCreated'] = moment(notice.dateCreated).format('DD/MM/YYYY');
          return rObj;
        });
        res.render('resident/notices', {
          error: false,
          data: noticesMap
        });
      }
    });
  }
};
