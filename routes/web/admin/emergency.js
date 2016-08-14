var User = require('../../../models/user');
var EmergencyContact = require('../../../models/emergencycontact');


module.exports = {


  get: function (req, res) {
    var societyId = req.session.user.societyId;
    EmergencyContact.find({
      "societyId": societyId
    }, function (err, contacts) {
      if (err) {
        console.log(err);
        res.render('admin/emergency',{
          error: true,
          message: "No contacts found"
        });
      } else {
        console.log(contacts);
        res.render('admin/emergency', {
          error: false,
          data: contacts,
          title: 'Emergency Contacts'
        });
      }
    });
  },

  post: function (req, res) {
    // console.log(req.body);
    var data = req.body;
    data.societyId = req.session.user.societyId;
    data.createdBy = req.session.user.id;
    var emergencycontact = new EmergencyContact(data);
    emergencycontact.save(function (err) {
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
            id: emergencycontact.id
          }
        });
      }
    });
    // var notice = new Notice(data);
    // notice.save(function (err) {
    //   if (err) {
    //     console.log(err);
    //     return res.json({
    //       error: true,
    //       message: "Fill the mandatory fields"
    //     });
    //   } else {
    //     res.json({
    //       error: false,
    //       data: {
    //         id: notice.id
    //       }
    //     });
    //   }
    // });
  },

  put: function (req, res) {
    var data = req.body;
    data.societyId = req.session.user.societyId;
    data.createdBy = req.session.user.id;
    // var emergencycontact = new EmergencyContact(data);
    EmergencyContact.findByIdAndUpdate(data.id, data, {
      new: true
    }, function (err, contact) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Contact could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: contact
        });
      }
    });
  },

  del: function (req, res) {
    var emId = req.body.id;
    EmergencyContact.findByIdAndRemove(emId, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Emergency Contact not deleted"
        });
      } else {
        res.json({
          error: false,
          message: "Emergency Contact successfully deleted"
        });
      }
    });
  }


}
