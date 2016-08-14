var User = require('../../../models/user');
var Notice = require('../../../models/notice');
var moment = require('moment');


module.exports = {


  get: function (req, res, next) {
    var societyId = req.session.user.societyId;
    // console.log(societyId);
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
            rObj['reminderDate'] = moment(notice.reminderDate).format('DD/MM/YYYY HH:mm');
            rObj['dateCreated'] = moment(notice.dateCreated).format('DD/MM/YYYY');
            return rObj;
          });
          console.log(noticesMap);
          res.render('admin/notices',{
            title: "Notices",
            error: false,
            data: noticesMap
          });
        }
      });


  },

  post: function (req, res, next) {
    // console.log(req.body);
    // console.log(new ObjectId("5799ae6eb3b21ea20ff4eaf5"));
    var data = req.body;
    // console.log(data.reminderDate);
    data.reminderDate = moment(data.reminderDate, 'DD/MM/YYYY HH:mm').toDate();
    data.societyId = req.session.user.societyId;
    var notice = new Notice(data);
    notice.save(function (err) {
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
            id: notice.id
          }
        });
      }
    });
  },

  put: function (req, res, next) {
    var data = req.body;
    data.reminderDate = moment(data.reminderDate, 'DD/MM/YYYY HH:mm').toDate();
    Notice.findByIdAndUpdate(data.id, data, {
      new: true
    }, function (err, notice) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Notice could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: notice
        });
      }
    });
  }


}
