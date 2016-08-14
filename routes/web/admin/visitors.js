var User = require('../../../models/user');
var FrequentVisitor = require('../../../models/frequentvisitor');
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
  get: function(req, res) {

    var societyId = req.session.user.societyId;


    var finder = {
      societyId: societyId
    };

    if (req.query.hasOwnProperty('name') && req.query.name != '')
      finder.name = new RegExp(req.query.name, "i");
    if (req.query.hasOwnProperty('contactPhone') && req.query.contactPhone != '')
      finder.contactPhone = req.query.contactPhone;

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

    FrequentVisitor
      .find(finder)
      .populate({
        path: 'addedBy',
        select: "name block flatNo"
      })
      .exec(function(err, visitors) {
        if (err) {
          console.log(err);
          return res.render('admin/visitors', {
            error: true,
            message: "Nothing Found",
            query: req.query
          });
        } else {
          if (visitors.length == 0) {
            return res.render('admin/visitors', {
              error: true,
              message: "Really Nothing Found",
              query: req.query
            });
          } else {

            var temp = [];

            /*
            Could not find way to populate ref docs with matched condition, so below lines are written to obtain the same job
            */

            if (matcher.block != null ) {
              visitors.forEach(function(visitor) {
                if (visitor.addedBy.block == matcher.block) {
                  console.log("pushing to temp", visitor);
                  temp.push(visitor);
                }
              });
            }



            var rObj = [];

            if (matcher.flatNo != null ) {
              visitors.forEach(function(visitor) {
                if (visitor.addedBy.flatNo == matcher.flatNo) {
                  console.log("pushing to rObj", visitor);
                  rObj.push(visitor);
                }
              });
            }

            if ( matcher.flatNo!=null || matcher.block!=null ) {
            visitors = arrayUnique(temp.concat(rObj));
              return res.render('admin/visitors', {
                error: false,
                data: visitors,
                query: req.query,
                moment: moment
              });
            } else {
              res.render('admin/visitors', {
                error: false,
                data: visitors,
                query: req.query,
                moment: moment
              });
            }
          }
        }
      });
  }
};
