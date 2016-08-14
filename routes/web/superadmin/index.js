var express = require('express');
var router = express.Router();
var  config  =  require('../../../config/main')[process.env.NODE_ENV || 'development'];
var moment = require('moment');

var User = require('../../../models/user');
var Society = require('../../../models/society');



/** start Login Logic **/

// The middleware
function requireLogin(req, res, next) {
    if (!req.session.authenticated || req.session.role != 'Super Admin') {
        res.redirect('/superadmin/logout');
    } else {
        next();
    }
};

// The login routes
router.post('/login', function(req, res) {
    if (!req.body.contactEmail || !req.body.password) {
        return res.json({
            error: true,
            message: 'Please provide email and password'
        });
    } else {
        User.findOne({
            contactEmail: req.body.contactEmail,
            role: 'Super Admin'
        }, function(err, user) {
            if (err)
                throw err;
            if (!user) {
                return res.json({
                    error: true,
                    message: 'User not found'
                });
            } else {
                // password checking
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        var data = {
                            id: user._id,
                            name: user.name,
                            role: user.role,
                            contactEmail: user.contactEmail
                        };
                        req.session.authenticated = true;
                        req.session.role = user.role;
                        req.session.user = data;
                        res.json({
                            error: false
                        });
                    } else {
                        return res.json({
                            error: true,
                            message: "Password did not matched"
                        });
                    }
                });
            }
        });
    }
});

/* GET login page super admin */
router.get('/login', function(req, res, next) {
    res.render('superadmin/login', {
        title: 'Super Admin Login',
        error: false
    });
});

router.all('/logout', function(req, res) {
    req.session.authenticated = false;
    req.session.user = null;
    req.session.role = null;
    res.redirect('/superadmin/login');
});

/** end Login Logic **/

router.get('/*', requireLogin); // important

router.get('/', function(req, res) {
    Society.find({}, function(err, societies) {
        if (err) {
            console.log(err);
            return res.render('superadmin/societies', {
                error: true,
                message: "Nothing found"
            });
        } else {
            var societyMap = societies.map(function(society) {
                var rObj = {};
                rObj.id = society._id;
                rObj.societyName = society.societyName;
                rObj.societyAddress = society.societyAddress;
                rObj.contactPerson = society.contactPerson;
                rObj.contactEmail = society.contactEmail;
                rObj.contactPhone = society.contactPhone;
                rObj.joinDate = moment(society.joinDate).format('MMM-YYYY');
                rObj.status = society.status;
                return rObj;

            });
            console.log(societyMap);
            res.render('superadmin/societies', {
                error: false,
                data: societyMap
            });
        }
    });
});


/* add society*/

router.get('/add', function (req, res) {
  res.render('superadmin/add');
});

router.post('/add', function (req, res) {
  var adminData = req.body.admin;
  delete req.body.admin;

  var societyData = req.body;

  var society = new Society(societyData);

  society.save(function (err) {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        message: 'Fill all the details'
      });
    }

    adminData.societyId = society._id;
    adminData.role = 'Admin';
    var user = new User(adminData);

    user.save(function (err) {
      if (err) {
        return res.json({
          error: true,
          message: 'Fill all the details'
        });
      }
      Society.findById(society._id, function (err, soc) {
        if (!err){
          soc.admin = user._id;
          soc.save(function (err) {
            if (!err) {
              res.json({
                error: false,
                data: { societyId: society._id, adminId: user._id }
              });
            }
          });
        }
      });
    });
  });
});


/* view a society */

router.get('/society/:id', function (req, res) {
  var id = req.params.id;
  Society.findById(id)
    .populate('admin')
      .exec(function (err, society) {
    if (err) {
      return res.render('superadmin/details', {
        error: true,
        data: 'No society found with this id'
      });
    } else {
      res.render('superadmin/details', {
        error: false,
        data: society,
        id: id,
        moment: moment
      });
    }
  });
});


router.get('/society/edit/:id', function (req, res) {
  var id = req.params.id;
  Society.findById(id).populate('admin').exec(function (err, society) {
    if (err) {
      return res.render('superadmin/edit', {
        error: true,
        message: 'No society found with this id'
      });
    } else {
      res.render('superadmin/edit', {
        error: false,
        data: society,
        id: id
      });
    }
  });
});


router.post('/edit', function (req, res) {
  var adminData = req.body.admin;
  delete req.body.admin;

  var societyData = req.body;

  Society.findByIdAndUpdate(societyData._id, societyData, {new: true}, function (err, society) {
    if (!err) {
      User.findByIdAndUpdate(adminData._id, adminData , {new: true}, function (err, admin) {
        if (!err){
          res.json({
            error: false,
            societyId: society._id
          });
        } else {
          res.json({
            error: true
          });
        }
      });
    } else {
      res.json({
        error: true
      });
    }
  })
});

module.exports = router;
