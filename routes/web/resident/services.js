var ServiceRequest = require('../../../models/servicerequest');
var ServiceOffered = require('../../../models/serviceoffered');
var Society = require('../../../models/society');
var User = require('../../../models/user');
var ObjectId = require('mongodb').ObjectId;

var moment = require('moment');



module.exports = {
  get: function (req, res) {
    var societyId = req.session.user.societyId;
    Society
      .findById(societyId)
      .populate('services')
      .exec(function (err, societies) {
        if (!err) {
          User
          .findById(req.session.user.id)
          .populate('myServices')
          .exec(function (err, user) {
            if (!err){
              ServiceRequest
                .find({requestedBy: req.session.user.id})
                .populate('providerAllocated')
                .populate('serviceType')
                .exec(function (err, results) {
                  if(err){
                    console.log(err);
                    return res.json({
                      error: true,
                      message: "Could not be saved"
                    });
                  } else {
                    console.log(results);
                    res.render('resident/services', {
                      error: false,
                      services: societies.services,
                      myServices: user.myServices,
                      serviceRequests: results,
                      moment: moment
                    });
                  }
                });
            }
          })

        }
      })
  },

  addToMyService: function (req, res) {
    User.findById(req.session.user.id, function (err, user) {
      if(!err){

        if (user.myServices.indexOf(req.body.serviceId) == -1)
          user.myServices.push(ObjectId(req.body.serviceId));
        else
        user.myServices.splice(user.myServices.indexOf(req.body.serviceId), 1);

        user.save(function (err) {
          if (!err){
            return res.json({error: false});
          } else {
            return res.json({error: true});
          }
        })
      }
    })
  },
  post: function (req, res) {
    var data = req.body;
    data.requestedBy = req.session.user.id;
    data.societyId = req.session.user.societyId;
    var servicerequest = new ServiceRequest(data);
    servicerequest.save(function (err) {
      if(err){
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be saved"
        });
      } else  {
        res.json({
          error: false,
          data: {
            id: servicerequest._id
          }
        });
      }
    });
  }
};
