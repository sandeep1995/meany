var User = require('../../../models/user');
var Document = require('../../../models/documents');

var config = require('../../../config/main')[process.env.NODE_ENV || 'development'];

var moment = require('moment');
var ObjectId=require('mongodb').ObjectId;

var docTypeList = require('../../../config/types')['docTypeList'];


module.exports = {


  get: function (req, res, next) {
    var residentId = req.session.user.id;
    var societyId = req.session.user.societyId;

    var filter = {"societyId": societyId};
    var matcher = {};

    var limit = 20; // If NO filters, show just 20
    if (req.query.doctype) {
      filter.docType = req.query.doctype;
      limit = null; // If a filter is active, there's no limit!
    }
    if (req.query.block) {
      matcher.block = req.query.block;
      limit = null; // If a filter is active, there's no limit!
    }
    if (req.query.flatno) {
      matcher.flatNo = req.query.flatno;
      limit = null; // If a filter is active, there's no limit!
    }

    Document
      .find(filter)
      .limit(limit)
      .populate({
        path: 'addedBy',
        // select: 'block '
        match: matcher
      })
      .exec(function (err, docs) {
        if (err) {
          res.json({
            error: true,
            reason: err
          })
        } else {
          console.log(docs);
          res.render('admin/documents', {
            title: "Documents",
            error: false,
            documentTypes: docTypeList,
            data: docs.filter(function (i) {return i.addedBy !== null}),
            moment: moment,
            query: req.query,
            awsRegion: config.aws.region,
            awsDocumentBucketName: config.aws.documentBucketName
          })
        }

      })




    // res.render('admin/documents', { title: 'My Documents' });
  },

  post: function (req, res, next) {
    console.log(req.body);
    console.log(new ObjectId("5799ae6eb3b21ea20ff4eaf5"));
    var data = req.body;
    data.societyId = new ObjectId("5799ae6eb3b21ea20ff4eaf5");
    var notice = new Notice(data);
    notice.save(function (err) {
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
            id: notice.id
          }
        });
      }
    });
  },

  put: function (req, res, next) {
    res.render('admin/notices', { title: 'Notices' });
  }


}
