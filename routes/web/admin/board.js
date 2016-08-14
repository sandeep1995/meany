var User = require('../../../models/user');
var BoardMember = require('../../../models/boardmember');
var config = require('../../../config/main')[process.env.NODE_ENV || 'development'];

module.exports = {


  get: function (req, res, next) {
    var societyId = req.session.user.societyId;
     BoardMember.find({
       "societyId": societyId
     }, function (err, members) {
       if (err) {
         console.log(err);
         return res.json({
           error: true,
           message: "Member could not be found"
         });
       } else {
         res.render('admin/board', {
           title: 'Board of Members',
           error: false,
           data: members,
           hasPresident: !! members.filter(function (i) {return i.position == "President"}).length,
           tempCreds: res.locals.tempCreds,
           awsRegion: config.aws.region,
           awsImageBucketName: config.aws.imageBucketName
         });
       }
     });

  },

  post: function (req, res, next) {
    var data = req.body;
    data.societyId = req.session.user.societyId;
    data.createdBy = req.session.user.id;
    var member = new BoardMember(data);
    member.save(function (err) {
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
            id: member.id
          }
        });
      }
    });
  },

  put: function (req, res, next) {
    var memberId = req.params.memberId;
    var data = req.body;
    data.societyId = req.session.user.societyId;
    data.createdBy = req.session.user.id;

    BoardMember.findByIdAndUpdate(memberId, data, {
      new: true
    }, function (err, member) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Member could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: member
        });
      }
    })
  }


}
