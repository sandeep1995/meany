var ServiceOffered = require('../../../models/serviceoffered');
var ServiceProvider = require('../../../models/serviceprovider');
var ServiceRequest = require('../../../models/servicerequest');
var moment = require('moment');

var Society = require('../../../models/society');

module.exports = {
  get: function (req, res) {
    var filter = {"societyId": societyId};
    if (req.query.serviceType) {
      filter.serviceType = req.query.serviceType;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    var matcher = {};
    if (req.query.block) {
      matcher.block = req.query.block;
    }
    if (req.query.flatno) {
      matcher.flatNo = req.query.flatno;
    }

    var societyId = req.session.user.societyId;
    ServiceOffered
        .find({societyId: societyId})
        .populate('serviceProvider')
        .exec(function(err, services) {
            if (err) {
                console.log(err);
                return res.render('admin/services', {
                    error: true,
                    message: "Could not get any services",
                    query: (req.query === undefined || req.query === null) ? {} : req.query
                });
            } else {
              ServiceRequest
                .find(filter)
                .populate('providerAllocated')
                .populate({path: 'requestedBy', match: matcher})
                .populate('serviceType')
                .exec(function (err, results) {
                  console.log(results);
                  console.log(services);
                  ServiceProvider.find({createdBy: req.session.user.id}, function (err, providers) {
                    console.log(providers);
                    if (!err) {
                      res.render('admin/services', {
                          error: false,
                          data: services,
                          serviceRequests: results,
                          providers: providers,
                          moment: moment,
                          query: (req.query === undefined || req.query === null) ? {} : req.query
                      });
                    }
                  });
                });
            }
        });
  },

  addService: function (req, res) {
    var data = req.body;
    data.createdBy = req.session.user.id;
    data.societyId = req.session.user.societyId;
    var serviceoffered = new ServiceOffered(data);
    serviceoffered.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be saved"
        });
      } else {
        Society.findById(data.societyId, function (err, society) {
          if (!err){
            console.log(data.societyId);
            society.services.push(serviceoffered.id);
            society.save(function (err) {
              if(!err){
                res.json({
                  error: false,
                  data: {
                    id: serviceoffered.id
                  }
                });
              }
            })
          }
        });
      }
    });
  },

  editService: function (req, res) {
    var serviceId = req.body.serviceId;
    delete req.body.serviceId;
    ServiceOffered.findByIdAndUpdate(serviceId, req.body, {new: true}, function (err, services) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be saved"
        });
      } else {
        res.json({
          error: false
        });
      }
    });
  },

  deleteService: function (req, res) {
    var serviceId = req.body.serviceId;

    ServiceOffered.findByIdAndRemove(serviceId, function (err) {
      if (err) {
          console.log(err);
          return res.json({
              error: true,
              message: "Could not be deleted"
          });
      } else {
          res.json({
              error: false,
              message: "Successfully deleted"
          });
      }
    });
  },

  addProvider: function (req, res) {
    var data = req.body;
    data.societyId = req.session.user.societyId;
    data.createdBy = req.session.user.id;
    var serviceProvider = new ServiceProvider(req.body);
    serviceProvider.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be saved"
        });
      } else {
        ServiceOffered.findById(req.body.serviceId, function (err, service) {
          if (!err){
            service.serviceProvider.push(serviceProvider.id);
            service.save(function (err) {
              if (!err){
                res.json({
                  error: false,
                  data: {
                    id: serviceProvider.id
                  }
                });
              }
            })
          }
        });
      }
    });
  },

  changeProviderStatus: function (req, res) {
    var status = req.body.status;
    var providerId = req.body.providerId;

    ServiceProvider.findByIdAndUpdate(providerId, {status: status}, {new: true}, function (err, provider) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be changed"
        });
      } else {
        res.json({
          error: false,
          data: provider
        });
      }
    });
  },

  deleteProvider: function (req, res) {
    var providerId = req.body.providerId;
    ServiceProvider.findByIdAndRemove(providerId, function (err) {
      if (err) {
          console.log(err);
          return res.json({
              error: true,
              message: "Could not be deleted"
          });
      } else {
          res.json({
              error: false,
              data: "Successfully deleted"
          });
      }
    });
  },

  addServiceRequest: function (req, res) {
    var serviceRequestId = req.body.serviceRequestId;
    delete req.body.serviceRequestId;
    ServiceRequest.findByIdAndUpdate(serviceRequestId, req.body, {new: true}, function (err, serviceRequest) {
      if(err){
        return res.json({
          error: true,
          message: "Could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: serviceRequest
        });
      }
    });
  }
};
