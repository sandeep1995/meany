var FrequentVisitor = require('../../../models/frequentvisitor');
var moment = require('moment');

module.exports = {
	get: function (req, res) {
    var residentId = req.session.user.id;
    FrequentVisitor.find({
      "addedBy": residentId
    }, function (err, visitors) {
      if (err) {
        console.log(err);
        return res.render('resident/visitors',{
          error: true,
          message: "Nothing Found"
        });
      } else {
        if (visitors.length == 0) {
          return res.render('resident/visitors',{
            error: true,
            message: "Nothing Found"
          });
        }
        visitors = visitors.map(function (visitor) {
          var rObj = {};
          rObj.id = visitor._id;
          rObj.name = visitor.name;
          rObj.contactPhone = visitor.contactPhone;
          rObj.expiryDate = moment(visitor.expiryDate).format('DD-MMM-YYYY');
          return rObj;
        });
        console.log(visitors);
        res.render('resident/visitors', {
          error: false,
          data: visitors
        });
      }
    });
  },

	post:  function (req, res) {
	var data = req.body;
	data.societyId = req.session.user.societyId;
	data.addedBy = req.session.user.id;
	console.log(data);
    var visitor = new FrequentVisitor(data);
    visitor.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Fill all the details"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: visitor.id
          }
        });
      }
    });
  },

  remove: function (req, res) {
    var freqVisitorId = req.body.id;
    FrequentVisitor.findByIdAndRemove(freqVisitorId, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Frequent Visitor could not be deleted"
        });
      } else {
        res.json({
          error: false,
          message: "Successfully deleted"
        });
      }
    });
  }
};