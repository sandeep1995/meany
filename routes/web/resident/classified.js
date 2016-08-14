var User = require('../../../models/user');
var Classified = require('../../../models/classified');

var ObjectId = require('mongodb').ObjectId;

var categoryList = require("../../../config/types")['categoryList'];


module.exports = {


  get: function(req, res) {
    var residentId = req.session.user.id;
    var societyId = req.session.user.societyId;

    var filter = {"societyId": societyId};

    if (req.query.isOffering) {
      filter.isOffering = (req.query.isOffering == "0") ? false: true;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.minprice) {
      filter.price = {$gte: Number(req.query.minprice)};
    }
    if (req.query.maxprice) {
      filter.price = {$lte: Number(req.query.maxprice)};
    }
    if (req.query.myadsonly) {
      filter.addedBy = residentId;
    }

    console.log((filter));

    Classified.find(filter)
      .populate("addedBy", "name")
      .exec(function(err, ad) {
        if (err) {
          console.log(err);
          return res.json({
            error: true,
            message: "Could not get anything",
          });
        } else {
          // var categoryList = ad.map(function(i) {
          //   return i.category;
          // });
          // categoryList = categoryList.filter(function(item, pos) {
          //   return categoryList.indexOf(item) == pos; // prune duplicate entries
          // });
          res.render('resident/classified', {
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
    // res.render('admin/classified', { title: 'Classified Ads' });
  },

  getMyAds: function (req, res) {
    var residentId = req.session.user.id;
    var societyId = req.session.user.societyId;

    Classified.find({societyId: societyId, addedBy: residentId}).exec(function (err, ads) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not get anything",
        });
      } else {
        res.render('resident/classified_myads', {
          error: false,
          title: 'My Ads',
          data: ads,
        })
        // res.json({
        //   error: false,
        //   title: 'My Ads',
        //   data: ads
        // })
      }
    })
  },

  getNew: function (req, res) {
    Classified.find().exec(function (err, ads){
      if (err) {
        res.render('resident/classified_add', { title: 'Add a Classified', categoryList: [] });
      }
      // var categoryList = ads.map(function(i) {
      //   return i.category;
      // });
      // categoryList = categoryList.filter(function(item, pos) {
      //   return categoryList.indexOf(item) == pos; // prune duplicate entries
      // });
      res.render('resident/classified_add', { title: 'Add a Classified', categoryList: categoryList.map(function (string) {return string.charAt(0).toUpperCase() + string.slice(1);}) });
    })
  },

  getEdit: function (req, res) {
    var adId = req.params.adId;
    Classified.findOne({_id: adId}, function (err, ad){
      if (err) {
        res.json({error: true, reason: err});
      }
      console.log(adId, ad);
      // var categoryList = ads.map(function(i) {
      //   return i.category;
      // });
      // categoryList = categoryList.filter(function(item, pos) {
      //   return categoryList.indexOf(item) == pos; // prune duplicate entries
      // });
      res.render('resident/classified_edit', {
        title: 'Edit Ad',
        adId: adId,
        data: ad,
        categoryList: categoryList.map(function (string) {return string.charAt(0).toUpperCase() + string.slice(1);})
      });
    })
  },

  postNew: function(req, res) {
    console.log(req.body);
    // console.log(new ObjectId("5799ae6eb3b21ea20ff4eaf5"));
    var data = req.body;
    data.addedBy = req.session.user.id;
    data.societyId = req.session.user.societyId;
    var classified = new Classified(data);
    classified.save(function(err) {
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
            id: classified.id
          }
        });
      }
    });
  },

  put: function (req, res) {
    var residentId = req.session.user.id;
    var societyId = req.session.user.societyId;
    var adId = req.params.adId;
    var data = req.body;
    data.approvalStatus = "Pending";

    Classified.update(
      {_id: adId, addedBy: residentId}, data, {}, function (err, numAffected) {
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

  },

  del: function (req, res) {
    var adId = req.params.adId;
    var residentId = req.session.user.id;

    Classified.remove({_id: adId, addedBy: residentId}, function (err) {
      if (err) {
        res.json({error: true, message: err})
      }
      res.json({error: false});
    })
  }


}
