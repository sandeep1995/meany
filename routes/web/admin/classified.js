var User = require('../../../models/user');
var Classified = require('../../../models/classified');

var categoryList = require("../../../config/types")['categoryList'];

module.exports = {


  get: function(req, res) {
    var residentId = req.session.user.id;
    var societyId = req.session.user.societyId;

    var filter = {"societyId": societyId};
    var limit = 20; // If NO filters, show just 20

    if (req.query.isOffering) {
      filter.isOffering = (req.query.isOffering == "0") ? false: true;
      limit = null; // If a filter is active, there's no limit!
    }
    if (req.query.category) {
      filter.category = req.query.category;
      limit = null; // If a filter is active, there's no limit!
    }
    if (req.query.minprice) {
      filter.price = {$gte: Number(req.query.minprice)};
      limit = null; // If a filter is active, there's no limit!
    }
    if (req.query.maxprice) {
      filter.price = {$lte: Number(req.query.maxprice)};
      limit = null; // If a filter is active, there's no limit!
    }

    console.log((filter));

    Classified.find(filter)
      .limit(limit)
      .populate("addedBy", "name")
      .exec(function(err, ad) {
        if (err) {
          console.log(err);
          return res.json({
            error: true,
            message: "Could not get anything",
          });
        } else {
          res.render('admin/classified', {
            error: false,
            title: 'Classified Ads',
            data: ad,
            categoryList: categoryList.map(function (string) {return string.charAt(0).toUpperCase() + string.slice(1);}), // capitalize first letter
            query: (req.query === undefined || req.query === null) ? {} : req.query
          })
          // res.json({
          //   error: false,
          //   title: 'Classified Ads',
          //   data: ad,
          //   categoryList: categoryList
          // })
        }
    });
  },

  put: function (req, res) {
    var adId = req.params.adId;
    Classified.update(
      {_id: adId}, {approvalStatus: req.body.approvalStatus}, {}, function (err, numAffected) {
        if (err || numAffected == 0) {
          console.log(err);
          return res.json({
            error: true,
            message: "Couldn't update!"
          });
        }
        res.json({
          error: false
        });

      }
    );
  }

}
