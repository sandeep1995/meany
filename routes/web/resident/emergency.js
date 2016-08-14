var EmergencyContact = require('../../../models/emergencycontact');

module.exports = {
	get: function (req, res){
  var societyId = req.session.user.societyId;
    EmergencyContact.find({
      "societyId": societyId
    }, function (err, contacts) {
      if (err) {
        console.log(err);
        return res.render('resident/emergency',{
          error: true,
          message: "No contacts found"
        });
      } else {
        console.log(contacts);
        res.render('resident/emergency', {
          error: false,
          data: contacts
        });
      }
    });
}
};