var User = require('../../../models/user');
var config = require('../../../config/main')[process.env.NODE_ENV || 'development'];

module.exports = {


  get: function(req, res, next){
  User.findById( req.session.user.id , function (err, data) {
    delete data.password;
      res.render('admin/profile', {
        title: 'Admin',
        user: data ,
        tempCreds: res.locals.tempCreds,
        awsRegion: config.aws.region,
        awsImageBucketName: config.aws.imageBucketName
      });
    });
  },

 post: function (req, res, next) {
  var userId = req.session.user.id;

    User.findByIdAndUpdate(userId, req.body, {new: true}, function (err, user){
      if(err){
        return res.json({
          error: true,
          message: "Could not be updated"
        });
      } else {
        user.password = undefined;
        console.log("Sent ", user);
        res.json({
          error: false,
          data: user
        });
      }
    });
  }
}
