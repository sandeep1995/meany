var Contact = require('../../../models/contact');
var moment = require('moment');

module.exports = {
	get: function (req, res) {
	var societyId = req.session.user.societyId;
    var userId = req.session.user.id;

    Contact.find({
      "openedBy": userId,
      "societyId": societyId
    }).populate('openedBy', 'name')
    	.populate('messages.userId', 'name role')
    		.exec(function (err, contacts) {
      if (err) {
        console.log(err);
        return res.render('resident/contact',{
          error: true,
          message: "Could not find any result"
        });
      } else {
      	var result = contacts.map(function (contact) {
            var robj = {};
            robj.id = contact.id;
            robj.category = contact.category;
            robj.status = contact.status;
            robj.messages = contact.messages;
            robj.dateOpened = contact.dateOpened;
            robj.subject = contact.subject;
            robj.openedBy = contact.openedBy;
            return robj;
          });
      	
        res.render('resident/contact', {
          error: false,
          data: result,
          moment: moment
        });
      }
    });
	},

	reply:  function (req, res) {
    var userId = req.session.user.id;
    var message = req.body.message
    var contactId = req.body.contactId;
    var status = req.body.status;
    Contact.findById(contactId, function (err, contact) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "No contacts found with this Id"
        });
      } else {
      	contact.status = status;
        contact.messages.push({
          "userId": userId,
          "message": message
        });
        contact.save(function (err) {
          if (err) {
            console.log(err);
            return res.json({
              error: true,
              message: "No contacts found with this Id"
            });
          } else {
            res.json({
              error: false,
              data: contact
            });
          }
        });
      }
    });
  },

	post: function (req, res) {

		req.body.societyId = req.session.user.societyId;
		req.body.openedBy = req.session.user.id;
		req.body.messages.userId = req.session.user.id;
		console.log(req.body);
		var contact = new Contact(req.body);

    	contact.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Oops! Some error occured"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: contact.id
          }
        });
      }
    });
	}
};