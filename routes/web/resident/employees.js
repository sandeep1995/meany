var ResidentEmployee = require('../../../models/employee');
var moment = require('moment');

var config = require('../../../config/main')[process.env.NODE_ENV || 'development'];
var employeeTypes = require('../../../config/types')['employeeTypes'];

module.exports = {
	get: function (req, res) {
    var residentId = req.session.user.id;
    ResidentEmployee.find({
      "addedBy": residentId
    }, function (err, employees) {
      if (err) {
        console.log(err);
        return res.render('resident/employees',{
          error: true,
          message: "No employees found"
        });
      } else {
        if (employees.length == 0) {
          return res.render('resident/employees',{
            error: true,
            message: "No employees found"
          });
        }
        employees = employees.map(function (obj) {
          rObj = {};
          rObj.id = obj._id;
          rObj.name = obj.name;
          rObj.gender = obj.gender;
          rObj.dob = obj.dob;
          rObj.contactPhone = obj.contactPhone;
          rObj.role = obj.role;
          rObj.regularSchedule = obj.regularSchedule;
          rObj.approvalStatus = obj.approvalStatus;
          rObj.awsProfilePicURL = obj.awsProfilePicURL;
          return rObj;
        });
        res.render('resident/employees', {
          error: false,
          data: employees,
					employeeTypes: employeeTypes,
					tempCreds: res.locals.tempCreds,
					awsRegion: config.aws.region,
					awsImageBucketName: config.aws.imageBucketName
        });
      }

    });
  },

	addEmployee: function (req, res) {
	var data = req.body;
	data.societyId = req.session.user.societyId;
	data.addedBy = req.session.user.id;

    var employee = new ResidentEmployee(data);
    employee.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Fill all the mandatory fileds"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: employee.id
          }
        });
      }
    });
  },

  remove: function (req, res) {
    var residentEmpID = req.body.residentEmpID;
    ResidentEmployee.findByIdAndRemove(residentEmpID, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Employee could not be deleted"
        });
      } else {
        res.json({
          error: false,
          message: "Employee successfully deleted"
        });
      }
    });
  }
};
