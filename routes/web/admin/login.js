var express = require('express');
var router = express.Router();
var config  =  require('../../../config/main')[process.env.NODE_ENV || 'development'];

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
  res.render('admin/login', { title: 'Resident Login', error: false });
});

router.all('/logout', function (req, res){
	req.session.authenticated = false;
	req.session.user = null;
  req.session.role = null;
	res.redirect('/login');
});
