var express = require('express');
var router = express.Router();
var config  =  require('../../../config/main')[process.env.NODE_ENV || 'development'];

var middleware = require('../../../middle.js');

var User = require('../../../models/user');

var profile = require("./profile");
var contacts = require("./contacts");
var polls = require("./polls");
var emergency = require("./emergency");
var classified = require("./classified");
var board = require("./board");
var residents = require("./residents");
var bills = require("./bills");
var notices = require("./notices");
var services = require("./services");
var employees = require("./employees");
var documents = require("./documents");
var visitors = require("./visitors");
var settings = require("./settings");

/** "Static" pages **/
/* Temrs and condition*/

router.get('/terms', function (req, res){
  res.render('admin/terms');
});

/* FAQ */

router.get('/faq', function (req, res){
  res.render('admin/faq');
});

/** start Login Logic **/

// The middleware
function requireLogin (req, res, next) {
  if (!req.session.authenticated || req.session.role != 'Admin') {
    res.redirect('/admin/logout');
  } else {
    next();
  }
};

// The login routes
router.post('/login', function (req, res){
	if (!req.body.contactEmail || !req.body.password) {
		return res.json({error: true, message: 'Please provide email and password'});
    } else {
      User.findOne({
        contactEmail: req.body.contactEmail,
        role: 'Admin'
      }, function (err, user) {
        if (err)
          throw err;
        if (!user) {
			return res.json({error: true, message: 'User not found'});
        } else {
          // password checking
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
				var data = {
                id: user._id,
                name: user.name,
                role: user.role,
                contactEmail: user.contactEmail,
                societyId: user.societyId
              };
              req.session.authenticated = true;
              req.session.role = user.role;
              req.session.user = data;
              res.json({error: false});
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

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Admin Login', error: false });
});

router.all('/logout', function (req, res){
	req.session.authenticated = false;
	req.session.user = null;
  req.session.role = null;
	res.redirect('/admin/login');
});

/** end Login Logic **/


/** Require Auth for ALL subsequent routes **/
router.all('*', requireLogin)

// Admin "home" page
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin Home' });
});


/** Profile **/
router.get('/profile', middleware.awsGetTempCreds, profile.get);
router.post('/profile', profile.post);
// router.put('/profile', profile.put);

/** Contact Us **/
router.get('/contacts', contacts.get);
router.post('/reply', contacts.reply);
// router.put('/contacts', contacts.put);

/** Opinion Polls **/
router.get('/polls', polls.get);
router.post('/polls', polls.post);
// router.put('/polls', polls.put);

/** Emergency Contacts **/
router.get('/emergency', emergency.get);
router.post('/emergency', emergency.post);
router.put('/emergency', emergency.put);
router.delete('/emergency', emergency.del);

/** Classified Ads **/
router.get('/classified', classified.get);
// router.post('/classified', classified.post);
router.put('/classified/:adId', classified.put);

/** Board of Members **/
router.get('/board', middleware.awsGetTempCreds, board.get);
router.post('/board', board.post);
router.put('/board/:memberId', board.put);

/** Manage Residents **/
router.get('/residents', residents.get);
// router.post('/residents', residents.post);
// router.put('/residents', residents.put);

/** My Bills **/
router.get('/bills', bills.get);
// router.post('/bills', bills.post);
// router.put('/bills', bills.put);

/** Notices **/
router.get('/notices', notices.get);
router.post('/notices', notices.post);
router.put('/notices', notices.put);

/** Manage Services **/
router.get('/services', services.get);
router.post('/addService', services.addService);
router.put('/editService', services.editService);
router.delete('/deleteService', services.deleteService);
router.post('/addProvider', services.addProvider);
router.put('/changeProviderStatus', services.changeProviderStatus);
router.delete('/deleteProvider', services.deleteProvider);
router.put('/addServiceRequest', services.addServiceRequest);

/** Employee List **/
router.get('/employees', employees.get);
router.put('/employees/approve', employees.approve);
router.put('/employees/reject', employees.reject);

/** My Documents **/
router.get('/documents', middleware.awsGetTempCreds, documents.get);
router.post('/documents', documents.post);
// router.put('/documents', documents.put);

/** Frequent Visitors **/
router.get('/visitors', visitors.get);
// router.put('/visitors', visitors.put);

/** Society Settings **/
router.get('/settings', settings.get);
// router.post('/settings', settings.post);
// router.put('/settings', settings.put);








module.exports = router;
