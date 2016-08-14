var BoardMember = require('../../../models/boardmember');

module.exports = {
	get: function (req, res){
   var societyId = req.session.user.societyId;
    BoardMember.find({
      "societyId": societyId
    }, function (err, member) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Member could not be found"
        });
      } else {
        res.render('resident/boardmembers', {
          error: false,
          data: member
        });
      }
    });
}
};