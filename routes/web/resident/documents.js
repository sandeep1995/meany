var Document = require('../../../models/documents');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

var config = require('../../../config/main')[process.env.NODE_ENV || 'development'];

var docTypeList = require('../../../config/types')['docTypeList'];


module.exports = {
  get: function (req, res) {
  var societyId = req.session.user.societyId;
  // console.log(societyId);
    Document.find({
      "societyId": societyId
    })
    .populate("addedBy", "name")
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "No docs found"
        });
      } else {
        res.render("resident/documents", {
          error: false,
          title: 'My Documents',
          moment: moment,
          data: docs,
          documentTypes: docTypeList,
          tempCreds: res.locals.tempCreds,
          awsKey: new ObjectID(), // a Key to uniquely identify the uploaded file
          awsRegion: config.aws.region,
          awsDocumentBucketName: config.aws.documentBucketName
        });
      }
    });
  },

  post: function (req, res) {
    var data = req.body;
    // console.log(data.reminderDate);
    data.societyId = req.session.user.societyId;
    data.addedBy = req.session.user.id;
    var doc = new Document(data);
    doc.save(function (err) {
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
            id: doc.id
          }
        });
      }
    });
  },

  del: function (req, res) {
    var docId = req.body.id;
    Document.findByIdAndRemove(docId, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Document not deleted"
        });
      } else {
        res.json({
          error: false,
          message: "Document successfully deleted"
        });
      }
    });
  }
};
