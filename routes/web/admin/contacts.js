var User = require('../../../models/user');
var Contact = require('../../../models/contact');
var moment = require('moment');


function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}


module.exports = {

 get: function (req, res) {
  var societyId = req.session.user.societyId;
    
    var finder = {
      societyId : societyId,
      status: 'In Progress'
    };

    if (req.query.hasOwnProperty('status') && req.query.status != '')
      finder.status = req.query.status;
    if (req.query.hasOwnProperty('category') && req.query.category != '')
      finder.category = req.query.category;


     var matcher = {
      block: null,
      flatNo: null
    };

    if (req.query.hasOwnProperty('block') && req.query.block != '')
      matcher.block = req.query.block;
    if (req.query.hasOwnProperty('flatNo') && req.query.flatNo != '')
      matcher.flatNo = req.query.flatNo;





    console.log("Finder: ", finder);
    console.log("Matcher: ", matcher);

    Contact.find(finder)
    .populate('openedBy', 'name block flatNo')
      .populate('messages.userId', 'name role')
        .exec(function (err, contacts) {
      if (err) {
        console.log(err);
        return res.render('admin/contacts',{
          error: true,
          message: "Could not find any result",
          query: req.query
        });
      } else {
        var result = contacts.map(function (contact) {
            var robj = {};
            robj.id = contact.id;
            robj.category = contact.category;
            robj.status = contact.status;
            robj.messages = contact.messages;
            robj.dateOpened = contact.dateOpened;
            robj.subject = contact.subject;
            robj.openedBy = contact.openedBy;
            return robj;
          });
        var temp = [];

            /*
            Could not find way to populate ref docs with matched condition, so below lines are written to obtain the same job
            */

            if (matcher.block != null ) {
              result.forEach(function(visitor) {
                if (visitor.openedBy.block == matcher.block) {
                  console.log("pushing to temp", visitor);
                  temp.push(visitor);
                }
              });
            }



            var rObj = [];

            if (matcher.flatNo != null ) {
              result.forEach(function(visitor) {
                if (visitor.openedBy.flatNo == matcher.flatNo) {
                  console.log("pushing to rObj", visitor);
                  rObj.push(visitor);
                }
              });
            }

            if ( matcher.flatNo!=null || matcher.block!=null ) {
            result = arrayUnique(temp.concat(rObj));
              return res.render('admin/contacts', {
                error: false,
                data: result,
                query: req.query,
                moment: moment
              });
            } else {
              res.render('admin/contacts', {
                error: false,
                data: result,
                query: req.query,
                moment: moment
              });
      }
    }
  });
  },

  reply:  function (req, res) {
    var userId = req.session.user.id;
    var message = req.body.message
    var contactId = req.body.contactId;
    var status = req.body.status;
    Contact.findById(contactId, function (err, contact) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "No contacts found with this Id"
        });
      } else {
        console.log(userId);
        contact.status = status;
        contact.messages.push({
          "userId": userId,
          "message": message
        });
        contact.save(function (err) {
          if (err) {
            console.log(err);
            return res.json({
              error: true,
              message: "No contacts found with this Id"
            });
          } else {
            res.json({
              error: false,
              data: contact
            });
          }
        });
      }
    });
  },

  put: function (req, res, next) {
    res.render('admin/notices', { title: 'Notices' });
  }


}
