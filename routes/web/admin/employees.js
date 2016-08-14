var ResidentEmployee = require('../../../models/employee');
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
    console.log("Query: ", req.query);


    ResidentEmployee
    .find(finder)
    .populate('addedBy', 'name block flatNo')
    .exec(function (err, employees) {
      if (err) {
        console.log(err);
        return res.render('admin/employees',{
          error: true,
          message: "No employees found",
          query: req.query
        });
      } else {
        if (employees.length == 0) {
          return res.render('admin/employees',{
            error: true,
            message: "No employees found",
            query: req.query
          });
        } else {


         var temp = [];

            /*
            Could not find way to populate ref docs with matched condition, so below lines are written to obtain the same job
            */

            if (matcher.block != null ) {
              employees.forEach(function(visitor) {
                if (visitor.addedBy.block == matcher.block) {
                  console.log("pushing to temp", visitor);
                  temp.push(visitor);
                }
              });
            }



            var rObj = [];

            if (matcher.flatNo != null ) {
              employees.forEach(function(visitor) {
                if (visitor.addedBy.flatNo == matcher.flatNo) {
                  console.log("pushing to rObj", visitor);
                  rObj.push(visitor);
                }
              });
            }

          if ( matcher.flatNo!=null || matcher.block!=null ) {
            employees = arrayUnique(temp.concat(rObj));

            console.log("concat", employees);
              return res.render('admin/employees', {
                error: false,
                data: employees,
                query: req.query,
                moment: moment
              });
            } else {
            console.log("normal", employees);

              res.render('admin/employees', {
                error: false,
                data: employees,
                query: req.query,
                moment: moment
              });
        }
      }
      }
    });
  },

  reject: function(req, res){
    var id = req.body.residentEmpID;
    var data = {
      approvalStatus: "Rejected"
    };
    ResidentEmployee.findByIdAndUpdate( id ,data, {new: true}, function (err, employee){
      if(err){
        return res.json({
          error: true,
          message: "Could not be updated"
        });
      } else {
        res.json({
          error: false
        });
      }
    });
  },

  approve: function(req, res){
      var id = req.body.residentEmpID;
    var data = {
      approvalStatus: "Approved"
    };
    ResidentEmployee.findByIdAndUpdate( id ,data, {new: true}, function (err, employee){
      if(err){
        return res.json({
          error: true,
          message: "Could not be updated"
        });
      } else {
        res.json({
          error: false
        });
      }
    });
  }
};
