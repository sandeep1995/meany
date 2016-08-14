var express = require('express');
var router = express.Router();
var config  =  require('../../../config/main')[process.env.NODE_ENV || 'development'];

var middleware = require('../../../middle.js');

var User = require('../../../models/user');

var profile = require('./profile');
var polls = require('./polls');
var classified = require('./classified');
var documents = require('./documents');
var notices = require('./notices');
var emergency = require('./emergency');
var search = require('./search');
var board = require('./board');
var contact = require('./contact');
var visitors = require('./visitors');
var employees = require('./employees');
var services = require('./services');


/** Login */

function requireLogin (req, res, next) {
  if (!req.session.authenticated || req.session.role != 'Resident') {
    res.redirect('/logout');
  } else {
    next();
  }
};

router.post('/login', function (req, res){
	if (!req.body.contactEmail || !req.body.password) {
		return res.json({error: true, message: 'Please provide email and password'});
    } else {
      User.findOne({
        contactEmail: req.body.contactEmail,
        role: 'Resident'
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
              console.log("Logging payload", data);
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

router.get('/login', function(req, res, next) {
  res.render('resident/login', { title: 'Resident Login', error: false });
});


router.all('/logout', function (req, res){
  req.session.authenticated = false;
  req.session.user = null;
  req.session.role = null;
  res.redirect('/login');
});



router.get('/', requireLogin, middleware.awsGetTempCreds, profile.get);
router.post('/editProfile', requireLogin, profile.post);

router.get('/polls', requireLogin, polls.get);
router.post('/polls', requireLogin, polls.post);

router.get('/classified', requireLogin, classified.get);
router.get('/classified/add', requireLogin, classified.getNew);
router.get('/classified/edit/:adId', requireLogin, classified.getEdit);
router.get('/classified/myads', requireLogin, classified.getMyAds);
router.post('/classified', requireLogin, classified.postNew);
router.put('/classified/:adId', requireLogin, classified.put);
router.delete('/classified/:adId', requireLogin, classified.del);

router.get('/documents', requireLogin, middleware.awsGetTempCreds, documents.get);
router.post('/documents', requireLogin, documents.post);
router.delete('/documents', requireLogin, documents.del);

router.get('/notices', requireLogin, notices.get);

router.get('/emergency', requireLogin, emergency.get);

router.get('/residents', requireLogin, search.get);
router.post('/search', requireLogin, search.post);


router.get('/board', requireLogin, board.get);

router.get('/contacts', requireLogin, contact.get);
router.post('/contacts', requireLogin, contact.post);
router.post('/reply', requireLogin, contact.reply);


router.get('/visitors', requireLogin, visitors.get);
router.post('/visitors', requireLogin, visitors.post);
router.delete('/visitors', requireLogin, visitors.remove);


router.get('/employees', requireLogin, middleware.awsGetTempCreds, employees.get);
router.post('/employees', requireLogin, employees.addEmployee);
router.delete('/employees', requireLogin, employees.remove);


router.get('/services', requireLogin, services.get);
router.put('/addToMyService', requireLogin, services.addToMyService);
router.post('/services', requireLogin, services.post);



router.get('/terms', requireLogin, function (req, res){
  res.render('resident/terms');
});

router.get('/faq', requireLogin, function (req, res){
  res.render('resident/faq');
});

module.exports = router;
