var jwt = require('jsonwebtoken');

var config = require('./config/main')[process.env.NODE_ENV || 'development'];

var AWS = require('aws-sdk');

module.exports = {

  awsGetTempCreds: function (req, res, next) {
    var sts = new AWS.STS({accessKeyId: config.aws.accessKeyId, secretAccessKey: config.aws.secretAccessKey});
    sts.getSessionToken(function (err, data) {
      if (err) {
        next(new Error("Error getting temp credentials from AWS!"));
      }
      else {
        res.locals.tempCreds = data.Credentials;
        next();
      }
    });
  },




  auth: function (role) {
    return function (req, res, next) {
      var token = req.headers.authorization || req.query.token || req.body.token;
      if (token == undefined) {
        switch (role) {
        case 'Super Admin':
          return res.redirect('/superadmin/#/login');
          break;
        case 'Admin':
          return res.redirect('/');
          break;
        case 'Resident':
        console.log(role);
          return res.redirect('/');
          break;
        default:
          return res.json({
            error: true,
            message: "You are not authorized"
          });
        }
      }
      if (typeof role == "string") {
        jwt.verify(token, config.secret, {
          algorithms: ["HS256"]
        }, function (err, user) {
          if (err) {
            return res.json({
              error: true,
              message: "Invalid Request"
            });
          } else if (user.role == role)
            next();
          else
            res.redirect('/');
        });
      } else if (role instanceof Array) {

        jwt.verify(token, config.secret, {
          algorithms: ["HS256"]
        }, function (err, user) {
          if (err) {
            return res.json({
              error: true,
              message: "Invalid Request"
            });
          } else if (user.role == role[0] || user.role == role[1] || user.role == role[2])
            next();
          else
            res.redirect('/');
        });

      } else {
        res.redirect('/');
      }
    }
  }
};
