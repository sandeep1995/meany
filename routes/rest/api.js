var express = require('express');


// for authentication purpose
var  passport  =  require('passport');

var  config  =  require('../../config/main')[process.env.NODE_ENV || 'development'];
var  jwt  =  require('jsonwebtoken');  


// load models
var User = require('../../models/user');
var Society = require('../../models/society');
var Notice = require('../../models/notice');
var EmergencyContact = require('../../models/emergencycontact');
var BoardMember = require('../../models/boardmember');
var ResidentEmployee = require('../../models/employee');
var FrequentVisitor = require('../../models/frequentvisitor');
var OpinionPoll = require('../../models/opinionpoll');
var ResidentDocument = require('../../models/documents');
var Classified = require('../../models/classified');
var Contact = require('../../models/contact');
var ServiceOffered = require('../../models/serviceoffered');
var ServiceProvider = require('../../models/serviceprovider');
var ServiceRequest = require('../../models/servicerequest');


var auth = function (role) {
    return function (req, res, next) {
      var token = req.headers.authorization || req.query.token || req.body.token;
      if (token == undefined) {
        switch (role) {
        case 'Super Admin':
          return res.json({
            error: true,
            message: "Authentication Failed"
          });
          break;
        case 'Admin':
          return res.json({
            error: true,
            message: "Authentication Failed"
          });
          break;
        case 'Resident':
          return res.json({
            error: true,
            message: "Authentication Failed"
          });
          break;
        default:
          return res.json({
            error: true,
            message: "You are not authorized"
          });
        }
      }
      if (typeof role == "string") {
        jwt.verify(token, config.secret, {
          algorithms: ["HS256"]
        }, function (err, user) {
          if (err) {
            return res.json({
              error: true,
              message: "Invalid Request"
            });
          } else if (user.role == role)
            next();
          else
            return res.json({
            error: true,
            message: "Authentication Failed"
          });
        });
      } else if (role instanceof Array) {

        jwt.verify(token, config.secret, {
          algorithms: ["HS256"]
        }, function (err, user) {
          if (err) {
            return res.json({
              error: true,
              message: "Invalid Request"
            });
          } else if (user.role == role[0] || user.role == role[1] || user.role == role[2])
            next();
          else
            return res.json({
            error: true,
            message: "Authentication Failed"
          });
        });

      } else {
        return res.json({
            error: true,
            message: "Authentication Failed"
          });
      }
    }
  }





  // passport stuffs

  var apiRoutes  =  express.Router();



    apiRoutes.post('/adduser', auth('Super Admin'), function(req, res) {
      var user = new User(req.body);
      user.save(function(err) {
        if (err) {
          console.log(err);
          res.json({
            error: true,
            message: "Fill all the mandatory fields"
          });
        } else {
          res.json({
            error: false,
            data: {
              id: user._id
            }
          });
        }
      });
    });

  apiRoutes.post('/register', function (req, res, next) {
    console.log(req.body);
    // if (!req.body.contactEmail || !req.body.password) {
    //   res.json({
    //     error: true,
    //     message: 'Please enter an email and password to register'
    //   });
    // } else {
      var user = new User(req.body);

      // saving to database

      user.save(function (err) {
        if (err) {
          console.log(err);
          return res.json({
            error: true,
            message: err.errors
          });
        }
        res.json({
          error: false,
          data: {
            id: user.id
          }
        });
      });

  });

  apiRoutes.put('/editUser/:userId', auth('Super Admin'), function(req, res){
    var userId = req.params.userId;
    User.findByIdAndUpdate(userId, req.body, {new: true}, function (err, user){
      if(err){
        return res.json({
          error: true,
          message: "Could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: user
        });
      }
    });
  });

  apiRoutes.post('/authenticate', function (req, res) {
    if (!req.body.contactEmail || !req.body.password) {
      return res.json({
        error: true,
        message: 'Invalid Details'
      });
    } else {
      User.findOne({
        contactEmail: req.body.contactEmail
      }, function (err, user) {
        if (err)
          throw err;
        if (!user) {
          res.json({
            error: true,
            message: 'You are not authorized'
          });
        } else {
          // password checking
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {

              var payload = {
                id: user._id,
                name: user.name,
                role: user.role,
                contactEmail: user.contactEmail
              };
              //console.log(payload);
              var token = jwt.sign(payload, config.secret, {
                expiresIn: 3600*24*30 // in seconds
              });
              //console.log(token);
              res.json({
                error: false,
                message: 'Successfully Authenticated',
                token: token
              });
            } else {
              // password does not match
              res.json({
                error: true,
                message: 'Failed to authenticate'
              });
            }
          });
        }
      });
    }
  });

apiRoutes.post('/authenticateSuper', function (req, res) {
    if (!req.body.contactEmail || !req.body.password) {
      return res.json({
        error: true,
        message: 'Invalid Details'
      });
    } else {
      User.findOne({
        contactEmail: req.body.contactEmail,
        role: req.body.role
      }, function (err, user) {
        if (err)
          throw err;
        if (!user) {
          res.json({
            error: true,
            message: 'You are not authorized'
          });
        } else {
          // password checking
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {

              var payload = {
                id: user._id,
                name: user.name,
                role: user.role,
                contactEmail: user.contactEmail
              };
              //console.log(payload);
              var token = jwt.sign(payload, config.secret, {
                expiresIn: 3600*24*30 // in seconds
              });
              //console.log(token);
              res.json({
                error: false,
                message: 'Successfully Authenticated',
                token: token
              });
            } else {
              // password does not match
              res.json({
                error: true,
                message: 'Failed to authenticate'
              });
            }
          });
        }
      });
    }
  });

  // without protection route
  apiRoutes.get('/getUser/:userId', auth('Super Admin') ,function (req, res) {
    User.findById( req.params.userId, function (err, data) {
        if( err) {
          console.log(err);
          return res.json({
            error: true,
            message: "Could not find the user"
          });
      } else {
        res.json({
          error: false,
          data: data
        });
      }
    });
  });





  /**
     * @api {post} /addsociety Create a new Society
     * @apiVersion 1.0.0
     * @apiName addSociety
     * @apiGroup Manage Societies
     * @apiPermission Super Admin
     *
     * @apiDescription Add a new society with all the necessary details by the super admin
     *
     * @apiParam {String} societyName Name of the society (required)
     * @apiParam {String} societyAddress Detailed address of the society (required)
     * @apiParam {enum}   status=active active/inactive default: active
     * @apiParam {String} [locLat] Lattitude
     * @apiParam {String} [locLong] Longitude
     * @apiParam {String} contactPerson (Required)
     * @apiParam {String} [contactEmail]
     * @apiParam {Array(Number)} contactPhone (Required)
     * @apiParam {Array(String)} modulesSubscribed
     * @apiParam {Number} approvedPAX
     * @apiParam {Number} merchId
     * @apiParam {Number} merchKey
     * @apiParam {String} merchSalt
     * @apiParam {Array(String)} services
     *
     * @apiParamExample {json} Add-Society-Example:
    *  {
         "societyName": "Obhishikta",
         "societyAddress": "Kalyani",
         "contactPerson": "Sandeep Acharya",
         "contactEmail": "dsdsjk@kdsjsk.com",
         "locLat": 8979.44,
         "locLong": 8798798.4,
         "approvedPAX": 897789,
         "merchSalt": "6454",
         "merchKey": "879498",
         "services": [
           "ksdljjksd",
           "jsdksdj"
         ],
         "modulesSubscribed": [
           "hshdjhds",
           "kdjfolskfj"
         ],
         "contactPhone": [
           7897897897,
           9879874155
         ]
       }
     * @apiSuccess {String} id         The new society ID.
     *
     *
     */

  apiRoutes.post('/addsociety', auth('Super Admin'), function (req, res, next) {

    // if (!req.body.societyName ||
    //   !req.body.societyAddress ||
    //   !req.body.contactPerson ||
    //   !req.body.contactPhone
    // ) {
    //   return res.json({
    //     error: true,
    //     message: 'Fill all the mandatory details'
    //   });
    // } else {
      var society = new Society(req.body);

      society.save(function (err) {
        if (err) {
          console.log(err);
          return res.json({
            error: true,
            message: 'Fill all the details'
          });
        }
        res.json({
          error: false,
          data: {
            id: society.id
          }
        });
      });

  });


  /**
     * @api {get} /getsocietydetails/:id Read data of a Society
     * @apiVersion 1.0.0
     * @apiName getSocietyDetails
     * @apiGroup Manage Societies
     * @apiPermission Super Admin, Admin
     *
     * @apiDescription Get the details of the Society
     *
     *
     * @apiParam {String} id The unique Society id
     *
     *
     * @apiSuccess {String} societyName
       @apiSuccess {String} societyAddress
       @apiSuccess {String} locLat
       @apiSuccess {String} locLong
       @apiSuccess {String} contactPerson
       @apiSuccess {String} contactEmail
       @apiSuccess {Array(String)} contactPhone
       @apiSuccess {Array(String)} modulesSubscribed
       @apiSuccess {Number} approvedPAX
     *
     * @apiError notFound   The <code>id</code> of the Society was not found.
 */
  apiRoutes.get('/getsocietydetails/:id', auth(['Super Admin', 'Admin']), function (req, res, next) {
    var id = req.params.id;
    Society.findById(id, function (err, society) {
      if (err) {
        return res.json({
          error: true,
          data: 'No society found with this id'
        });
      } else {
        return res.json({
          error: false,
          data: society
        });
      }
    });
  });

  /**
     * @api {put} /editsociety/:id Update the Society
     * @apiVersion 1.0.0
     * @apiName editSociety
     * @apiGroup Manage Societies
     * @apiPermission Super Admin, Admin
     *
     * @apiDescription Update the society details, all properties must be sent
     *
     *
     * @apiParam {String} id The unique Society id (through URL)
     *

     * @apiParam {String} societyName Name of the society
     * @apiParam {String} societyAddress Detailed address of the society
     * @apiParam {String} locLat Lattitude
     * @apiParam {String} locLong Longitude
     * @apiParam {String} contactPerson
     * @apiParam {String} contactEmail
     * @apiParam {Array(Number)} contactPhone
     * @apiParam {Array(String)} modulesSubscribed
     * @apiParam {Number} approvedP
     * @apiParam {Number} merchId
     * @apiParam {Number} merchKey
     * @apiParam {String} merchSalt
     * @apiParamExample {json} Request Update Format
     * {
         "societyName": "Obhishikta",
         "societyAddress": "Kalyani",
         "contactPerson": "Sandeep Acharya",
         "contactEmail": "dsdsjk@kdsjsk.com"
    }
     @apiSuccess {json} society Newly updated society object with the properties
     @apiSuccessExample {json} Success-Response:
     {
  "error": false,
  "data": {
    "_id": "5785e7b5b7585d9426694023",
    "societyName": "Obhishikta",
    "societyAddress": "Kalyani",
    "contactPerson": "Sandeep Acharya",
    "contactEmail": "i.am.sandeep.acharya@gmail.com",
    "locLat": "8979.44",
    "locLong": "8798798.4",
    "approvedPAX": 897789,
    "merchKey": 879498,
    "merchSalt": "6454",
    "__v": 0,
    "services": [
      "ksdljjksd",
      "jsdksdj"
    ],
    "modulesSubscribed": [
      "hshdjhds",
      "kdjfolskfj"
    ],
    "contactPhone": [
      7897897897,
      9879874155
    ],
    "status": "active",
    "joinDate": "2016-07-13T07:03:17.214Z"
  }
}
 */

  apiRoutes.put('/editsociety/:id', auth(['Super Admin', 'Admin']), function (req, res) {
    var id = req.params.id;
    console.log(req.body);
    Society.findByIdAndUpdate(id, req.body, {
      new: true
    }, function (err, society) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: 'Update was not possible'
        })
      } else {
        res.json({
          error: false,
          data: society
        });
      }
    });
  });

  /*
    /**
     * @api {get} /getsocietylist Get all the societies
     * @apiVersion 1.0.0
     * @apiName getSocietyList
     * @apiGroup Manage Societies
     * @apiPermission Super Admin
     *
     * @apiDescription Get all the societies brief details
     * @apiSuccess {Array(Society)} Breif society information
     *  @apiSuccess {String} id
        @apiSuccess {String} societyName
        @apiSuccess {String} societyAddress
        @apiSuccess {String} contactPerson
        @apiSuccess {String} contactEmail
        @apiSuccess {Array(Number)} contactPhone
        @apiSuccessExample {json} Success-Response:

           {
  "error": false,
  "data": [
    {
      "id": "5785d1c521e3f068239e1d5d",
      "societyName": "Urbana",
      "societyAddress": "Kolkata",
      "contactPerson": "Sandeep Acharya",
      "contactEmail": "dsdsjk@kdsjsk.com",
      "contactPhone": [
        7897897897,
        9879874155
      ]
    },
    {
      "id": "5785e7b5b7585d9426694023",
      "societyName": "Obhishikta",
      "societyAddress": "Kalyani",
      "contactPerson": "Sandeep Acharya",
      "contactEmail": "i.am.sandeep.acharya@gmail.com",
      "contactPhone": [
        7897897897,
        9879874155
      ]
    }
  ]
}
     */
  apiRoutes.get('/getsocietylist', auth('Super Admin') ,function (req, res) {
    Society.find({}, function (err, societies) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Nothing found"
        });
      } else {
        var societyMap = societies.map(function (society) {
          var rObj = {};
          rObj.id = society._id;
          rObj.societyName = society.societyName;
          rObj.societyAddress = society.societyAddress;
          rObj.contactPerson = society.contactPerson;
          rObj.contactEmail = society.contactEmail;
          rObj.contactPhone = society.contactPhone;
          rObj.joinDate = society.joinDate;
          rObj.status = society.status;
          return rObj;

        });
        res.json({
          error: false,
          data: societyMap
        });
      }
    });
  });

  /**
     * @api {post} /addnotice Create a new Notice
     * @apiVersion 1.0.0
     * @apiName addNotice
     * @apiGroup Notice
     * @apiPermission Admin
     *
     * @apiDescription Add a new notice with all the necessary details by the  admin

     * @apiParam {String} subject   Notice Subject (Required)
     * @apiParam {String} content   Notice Content (Required)
     * @apiParam {Date} dateCreated
     * @apiParam {Date} reminderDate
     * @apiParam {String} societyId (Required)
     * @apiParam {String} createdBy Admin Id (Required)

       @apiSuccess {String} id Id of the newly created notice

     */

  apiRoutes.post('/addnotice', auth('Admin'), function (req, res) {
    var notice = new Notice(req.body);
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
  });

  /**
     * @api {get} /getnotices/:societyId Get notices of a society
     * @apiVersion 1.0.0
     * @apiName getNotices
     * @apiGroup Notice
     * @apiPermission Admin, Resident
     *
     * @apiDescription Get all the notices of a particular society
     * @apiParam {String} societyId (Required)
     *  @apiSuccess {String} subject   Notice Subject
     * @apiSuccess {String} content   Notice Content
     * @apiSuccess {Date} dateCreated
     * @apiSuccessExample {json} Success Response
     {
  "error": false,
  "data": [
    {
      "subject": "Wow",
      "content": "Hiij kjefds kjdfkjas joeiwjvoew ejfojeow",
      "dateCreated": "2016-07-14T06:36:43.088Z"
    },
    {
      "subject": "jksdksjw",
      "content": "kjdshkjsdhksjdlsdla",
      "dateCreated": "2016-07-14T06:37:02.238Z"
    }
  ]
}

     */

  apiRoutes.get('/getnotices/:societyId', auth(['Admin', 'Resident']), function (req, res) {
    var societyId = req.params.societyId;

    Notice.find({
      "societyId": societyId
    }, function (err, notices) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "No notices found"
        });
      } else {
        var noticesMap = notices.map(function (notice) {
          var rObj = {};
          rObj['subject'] = notice.subject;
          rObj['content'] = notice.content;
          rObj['dateCreated'] = notice.dateCreated;
          return rObj;
        });

        res.json({
          error: false,
          data: noticesMap
        });

      }
    });
  });

  /**
     * @api {put} /editnotice/:noticeId Update a notice
     * @apiVersion 1.0.0
     * @apiName editNotice
     * @apiGroup Notice
     * @apiPermission Admin
     *
     * @apiDescription Updating a notice by the Admin
     * @apiParam {String} noticeId (Required)
     * @apiSuccessExample {json} Response
     {
  "error": false,
  "data": {
    "_id": "578733748cba62ec0c49f8bc",
    "subject": "jiiiiiiiiiiiii111111UUw",
    "content": "kjdshkjskjssjdlsdla",
    "societyId": "57860082a4d591101e2d0604",
    "createdBy": "578529ffa3b34e8c17dce78e",
    "__v": 0,
    "dateCreated": "2016-07-14T06:38:44.702Z",
    "reminderDate": "2016-07-14T06:38:44.702Z"
  }
}
   */

  apiRoutes.put('/editnotice/:id', auth('Admin'), function (req, res) {
    var id = req.params.id;
    Notice.findByIdAndUpdate(id, req.body, {
      new: true
    }, function (err, notice) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Notice could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: notice
        });
      }
    });
  });
  /**
     * @api {delete} /deletenotice/:noticeId Delete a notice
     * @apiVersion 1.0.0
     * @apiName deleteNotice
     * @apiGroup Notice
     * @apiPermission Admin
     *
     * @apiDescription Updating a notice by the Admin
     * @apiParam {String} noticeId (Required)
     * @apiSuccessExample {json} Response
     {
  "error": false,
  "data": "Notice successfully deleted"
}
     */
  apiRoutes.delete('/deletenotice/:id', auth('Admin'), function (req, res) {
    var noticeId = req.params.id;
    Notice.findByIdAndRemove(noticeId, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Notice not deleted"
        });
      } else {
        res.json({
          error: false,
          data: "Notice successfully deleted"
        });
      }
    });
  });

  /**
     * @api {post} /addemergencycontact Create a new Emergency Contact
     * @apiVersion 1.0.0
     * @apiName addEmergencyContact
     * @apiGroup Emergency Contact
     * @apiPermission Admin
     *
     * @apiDescription Add a new Emergency Contact with all the necessary details by the  admin
     * @apiParam {String}   type    Type of the emergency contact (Required)
       @apiParam {Array(contacts)}  contacts Array of contacts
       @apiParam {String} contacts.organization Name of the org (Required)
       @apiParam {Number} contatcs.contactPhone Number of the org (Required)
       @apiParam {String} societyId (Required)
       @apiParam {String} createdBy (Required)
       @apiParamExample {json} Request Example
       {
    "type": "Police",

    "contacts":[{
        "organization": "Staton2",
        "contactPhone": 78978323244
    }, {
        "organization": "Staton3",
        "contactPhone": 7897897
    }, {
        "organization": "Staton4",
        "contactPhone": 7897897
    }, {
        "organization": "Staton5",
        "contactPhone": 7897897
    }],

    "societyId": "5785e7b5b7585d9426694023",

    "createdBy": "578529ffa3b34e8c17dce78e"
}

       @apiSuccess {String} id Emergnecy contact Id
    */

  apiRoutes.post('/addemergencycontact', auth('Admin'), function (req, res) {
    var emergencycontact = new EmergencyContact(req.body);
    emergencycontact.save(function (err) {
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
            id: emergencycontact.id
          }
        });
      }
    });
  });



  /**
       * @api {get} /getemergencycontacts/:societyId Get Emergency Contacts of a society
       * @apiVersion 1.0.0
       * @apiName getEmergencyContacts
       * @apiGroup Emergency Contact
       * @apiPermission Admin, Resident
       *
       * @apiDescription Get all the Emergency Contacts of a particular society
       * @apiParam {String} societyId (Required)

       * @apiSuccessExample {json} Success Response
          {
    "error": false,
    "data": [
      {
        "_id": "5787433d5c6c78040e86c997",
        "type": "Police",
        "societyId": "5785e7b5b7585d9426694023",
        "createdBy": "578529ffa3b34e8c17dce78e",
        "__v": 0,
        "contacts": [
          {
            "organization": "Staton2",
            "contactPhone": 78978323244,
            "_id": "5787433d5c6c78040e86c99b"
          },
          {
            "organization": "Staton3",
            "contactPhone": 7897897,
            "_id": "5787433d5c6c78040e86c99a"
          }
        ]
      },
      {
        "_id": "5787603631aea8b02023a404",
        "type": "Ambulance",
        "societyId": "5785e7b5b7585d9426694023",
        "createdBy": "578529ffa3b34e8c17dce78e",
        "__v": 0,
        "contacts": [
          {
            "organization": "Staton2",
            "contactPhone": 78978323244,
            "_id": "5787603631aea8b02023a408"
          }
        ]
      }
    ]
  }

  */
  apiRoutes.get('/getemergencycontacts/:societyId', auth(['Admin', 'Resident']), function (req, res) {
    var societyId = req.params.societyId;

    EmergencyContact.find({
      "societyId": societyId
    }, function (err, contacts) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "No contacts found"
        });
      } else {
        res.json({
          error: false,
          data: contacts
        });

      }
    });
  });


  /**
     * @api {put} /editemergencycontact/:emId Update a Emergency Contact
     * @apiVersion 1.0.0
     * @apiName editEmergencyContact
     * @apiGroup Emergency Contact
     * @apiPermission Admin
     *
     * @apiDescription Updating a Emergency Contact by the Admin. Contacts are overridden. Each request should
        contain all the contacts object
     * @apiParam {String} emergencyContactId Through Url (Required)
       @apiParam {String}   type    Type of the emergency contact
       @apiParam {Array(contacts)}  contacts Array of contacts
       @apiParam {String} contacts.organization Name of the org (Required)
       @apiParam {Number} contatcs.contactPhone Number of the org (Required)
       @apiParam {String} societyId
       @apiParam {String} createdBy
     * @apiSuccessExample {json} Response
     {
  "error": false,
  "data": {
    "_id": "5787433d5c6c78040e86c997",
    "type": "Police",
    "societyId": "5785e7b5b7585d9426694023",
    "createdBy": "578529ffa3b34e8c17dce78e",
    "__v": 0,
    "contacts": [
      {
        "organization": "Jadavpur",
        "contactPhone": 8979889694,
        "_id": "5787668b8d7320d82b918b09"
      },
      {
        "organization": "Anandapur",
        "contactPhone": 8979889694,
        "_id": "5787668b8d7320d82b918b08"
      }
    ]
  }
}
    */

  apiRoutes.put('/editemergencycontact/:emId', auth('Admin'), function (req, res) {
    var id = req.params.emId;
    EmergencyContact.findByIdAndUpdate(id, req.body, {
      new: true
    }, function (err, contact) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Contact could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: contact
        });
      }
    });
  });

  /**
     * @api {delete} /deleteemergencycontact/:emId Delete a Emergency Contact
     * @apiVersion 1.0.0
     * @apiName deleteEmergencyContact
     * @apiGroup Emergency Contact
     * @apiPermission Admin
     *
     * @apiDescription Deleting a Emergency Contact by the Admin
     * @apiParam {String} emeregencyContactId (Required)
     * @apiSuccessExample {json} Response
     {
  "error": false,
  "data": "Emergency Contact successfully deleted"
}*/

  apiRoutes.delete('/deleteemergencycontact/:emId', auth('Admin'), function (req, res) {
    var emId = req.params.emId;
    EmergencyContact.findByIdAndRemove(emId, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Emergency Contact not deleted"
        });
      } else {
        res.json({
          error: false,
          message: "Emergency Contact successfully deleted"
        });
      }
    });
  });

  /**
     * @api {post} /addboardmember Create one or multiple board members at a time
     * @apiVersion 1.0.0
     * @apiName addBoardMember
     * @apiGroup Board Member
     * @apiPermission Admin
     * @apiDescription It supports batch insert. To create one boardmember send one object.
      To create multiple boardmembers send Array of objects.
      @apiParam {String} name
      @apiParam {String} position
      @apiParam {String} [profilePicURL]
      @apiParam {String} [profilePicKey]
      @apiParam {String} contactEmail
      @apiParam {String} contactPhone
      @apiParam {String} societyId
      @apiParam {String} createdBy Admin Id
      @apiParamExample {json} Request Example
  [{
 "name": "Acharya",
 "societyId": "5785d1c521e3f068239e1d5d",
 "createdBy": "578529cea3b34e8c17dce78d",
 "contactEmail": "i.am.sandeep@gmail.com",
 "contactPhone": 89765454
},{
 "name": "jkasdhkdsj",

 "societyId": "5785d1c521e3f068239e1d5d",
 "createdBy": "578529cea3b34e8c17dce78d",
 "contactEmail": "i.am.sandeep@gmail.com",
 "contactPhone": 89765454
}
}]

@apiSuccess {String} boardMemberId Id of the newly created board members




     **/


  apiRoutes.post('/addboardmember', function (req, res) {
    if (req.body instanceof Array) {
      // if Bulk adding
      BoardMember.insertMany(req.body, function (err, doc) {
        if (err) {
          console.log(err);
          return res.json({
            error: true,
            message: "Bulk Adding Failed"
          });
        } else {


          return res.json({
            error: false,
            data: doc
          });
        }
      });
    } else {
      // if a single object
      var member = new BoardMember(req.body);
      member.save(function (err) {
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
              id: member.id
            }
          });
        }
      });
    }
  });

  /**
       * @api {get} /getboardmembers/:societyId Get all the board memebers for a society
       * @apiVersion 1.0.0
       * @apiName getBoardMembers
       * @apiGroup Board Member
       * @apiPermission Admin, Resident
        @apiParam {String} societyId
        @apiSuccess {String} name
        @apiSuccess {String} position
        @apiSuccess {String} profilePicURL
        @apiSuccess {String} profilePicKey
        @apiSuccess {String} contactEmail
        @apiSuccess {String} contactPhone
        @apiSuccessExample {json} Success Response
        {
    "error": false,
    "data": [
      {
        "_id": "5787883b577b421c2e393258",
        "name": "Acharya",
        "societyId": "5785d1c521e3f068239e1d5d",
        "createdBy": "578529cea3b34e8c17dce78d",
        "__v": 0,
        "contactPhone": 11111111111,
        "contactEmail": "11111111111@gmail.com"
      },
      {
        "_id": "57878888789d8df40cedbe38",
        "name": "Acharya",
        "societyId": "5785d1c521e3f068239e1d5d",
        "createdBy": "578529cea3b34e8c17dce78d"
      },
      {
        "_id": "57878888789d8df40cedbe39",
        "name": "jkasdhkdsj",
        "societyId": "5785d1c521e3f068239e1d5d",
        "createdBy": "578529cea3b34e8c17dce78d"
      }]
  }
       */

  apiRoutes.get('/getboardmembers/:societyId', auth(['Admin', 'Resident']), function (req, res) {
    var societyId = req.params.societyId;
    BoardMember.find({
      "societyId": societyId
    }, function (err, member) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Member could not be found"
        });
      } else {
        res.json({
          error: false,
          data: member
        });
      }
    });
  });
  /**
       * @api {put} /editboardmember/:boardMemberID Edit one Board Member
       * @apiVersion 1.0.0
       * @apiName editBoardMember
       * @apiGroup Board Member
       * @apiPermission Admin
         @apiParam {String} boardMemberID
        @apiParam {String} name
        @apiParam {String} position
        @apiParam {String} contactEmail
        @apiParam {String} contactPhone
        @apiParamExample {json} Request Example
        {
        "contactEmail": "11111111111@gmail.com",
        "contactPhone": 11111111111
        }

        @apiSuccessExample {json}  Success Example
        {
    "error": false,
    "data": {
      "_id": "5787883b577b421c2e393258",
      "name": "Acharya",
      "contactPhone": 11111111111,
      "contactEmail": "11111111111@gmail.com"
    }
  }

    */


  apiRoutes.put('/editboardmember/:boardMemberID', auth('Admin'), function (req, res) {
    var boardMemberID = req.params.boardMemberID;
    BoardMember.findByIdAndUpdate(boardMemberID, req.body, {
      "new": true
    }, function (err, member) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Member could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: member
        });
      }
    });
  });

  /**
     * @api {post} /addemployee Create one employee
     * @apiVersion 1.0.0
     * @apiName addemployee
     * @apiGroup Manage Employees
     * @apiPermission Resident
     * @apiDescription Add one employee
      @apiParam {String} name
      @apiParam {String} gender
      @apiParam {Date} dob
      @apiParam {Number} contactPhone
      @apiParam {String} role
      @apiParam {String} regularSchedule
      @apiParam {String} addedBy ResidentId
      @apiParam {String} societyId
      @apiParamExample {json} Request Example
      {
        "name": "sujit",
        "gender": "male",
        "addedBy": "57889a00e0a8c7bc1ebdb60c",
        "societyId": "5785d1c521e3f068239e1d5d",
        "dob": "Fri Jul 15 2016 12:41:30",
        "contactPhone": 789789789,
        "role": "Servent",
        "regularSchedule": "Morning"
      }

      @apiSuccess {String} employeeId Newly created employee ID
      @apiSuccessExample {json} Success Example
      {
  "error": false,
  "data": {
    "id": "578cbd2bff1377cc206e2c37"
  }
}

    */

  apiRoutes.post('/addemployee', auth('Resident'), function (req, res) {
    var employee = new ResidentEmployee(req.body);
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
  });
  /**
       * @api {get} /getemployees/:residentId Get employees for a resident
       * @apiVersion 1.0.0
       * @apiName getemployees
       * @apiGroup Manage Employees
       * @apiPermission Resident
       * @apiDescription Get employees for a resident
       * @apiParam {String} residentId
          @apiSuccess {String} name
          @apiSuccess {String} gender
          @apiSuccess {Date} dob
          @apiSuccess {Number} contactPhone
          @apiSuccess {String} role
          @apiSuccess {String} regularSchedule
          @apiSuccessExample {json} Success Example
          {
    "error": false,
    "data": [
      {
        "name": "sujit",
        "gender": "male",
        "dob": "2016-07-15T07:11:30.000Z",
        "contactPhone": 789789789,
        "role": "uuu",
        "regularSchedule": "Morning"
      },
      {
        "name": "sujit",
        "gender": "male",
        "dob": "2016-07-15T07:11:30.000Z",
        "contactPhone": 789789789,
        "role": "uuu",
        "regularSchedule": "Morning"
      }
    ]
  }
       */

  apiRoutes.get('/getemployees/:residentId', auth('Resident'), function (req, res) {
    var residentId = req.params.residentId;
    ResidentEmployee.find({
      "addedBy": residentId
    }, function (err, employees) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "No employees found"
        });
      } else {
        if (employees.length == 0) {
          return res.json({
            error: true,
            message: "No employees found"
          });
        }
        employees = employees.map(function (obj) {
          rObj = {};
          rObj.name = obj.name;
          rObj.gender = obj.gender;
          rObj.dob = obj.dob;
          rObj.contactPhone = obj.contactPhone;
          rObj.role = obj.role;
          rObj.regularSchedule = obj.regularSchedule;
          return rObj;
        });
        return res.json({
          error: false,
          data: employees
        });
      }

    });
  });

  /**
     * @api {delete} /deleteEmployee/:residentEmpID Delete one employee
     * @apiVersion 1.0.0
     * @apiName deleteEmployee
     * @apiGroup Manage Employees
     * @apiPermission Resident
     * @apiDescription Delete employee for a resident
     * @apiParam {String} residentEmpId
     * @apiSuccessExample {json} Success Response
     {
    "error": false,
    "message": "Employee successfully deleted"
      }

     */

  apiRoutes.delete('/deleteEmployee/:residentEmpID', auth('Resident'), function (req, res) {
    var residentEmpID = req.params.residentEmpID;
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
  });

  /**
     * @api {post} /addfreqvisitor Add one frequent visitor
     * @apiVersion 1.0.0
     * @apiName addfrequentvisitor
     * @apiGroup Frequent Visitor
     * @apiPermission Resident
     * @apiDescription Add one frequent visitor
          @apiParam {String} name
          @apiParam {Array(Number)} contactPhone
          @apiParam {String} expiryDate
          @apiParam {String} token
          @apiParam {String} societyId
          @apiParam {String} addedBy ResidentId
          @apiParamExample {json} Request Example
          {
    "name": "Sandeep",
    "expiryDate":"Fri Jul 15 2016 18:04:31",
    "contactPhone": [
        8977897987,897987987
    ],

    "token": "fsiuhiusdhiushdfiuohsdfouhdsfiudsifdsjfisdjaoja",
    "societyId": "5785d1c521e3f068239e1d5d",
    "addedBy": "578877021787272424e854f0"
}
@apiSuccess {String} freqVisitorID Id of the newly created Visitor
@apiSuccessExample {json} Success Example
{
  "error": false,
  "data": {
    "id": "578cc87dcc170e3413673c65"
  }
}
     */

  apiRoutes.post('/addfreqvisitor', auth('Resident'), function (req, res) {
    var visitor = new FrequentVisitor(req.body);
    visitor.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Fill all the details"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: visitor.id
          }
        });
      }
    });
  });
  /**
       * @api {post} /getfreqvisitor/:residentId Add one frequent visitor
       * @apiVersion 1.0.0
       * @apiName getfreqvisitor
       * @apiGroup Frequent Visitor
       * @apiPermission Resident
       * @apiParam {String} residentId
        @apiSuccess {String} name
        @apiSuccess {Array(Number)} contactPhone
        @apiSuccess {Date} expiryDate
        @apiSuccess {String} token
        @apiSuccessExample {json} Success Example
        {
    "error": false,
    "data": [
      {
        "name": "kkkkkkkkkkk",
        "token": "fsiuhiusdhiushdfiuohsdfouhdsfiudsifdsjfisdjaoja",
        "contactPhone": [
          8977897987,
          897987987
        ],
        "expiryDate": "2016-07-15T12:34:31.000Z"
      },
      {
        "name": "aaaaaaaaaaaaaaaaaaaaaaaaa",
        "token": "fsiuhiusdhiushdfiuohsdfouhdsfiudsifdsjfisdjaoja",
        "contactPhone": [
          8977897987,
          897987987
        ],
        "expiryDate": "2016-07-15T12:34:31.000Z"
      }
    ]
  }
       */

  apiRoutes.get('/getfreqvisitor/:residentId', auth('Resident'), function (req, res) {
    var residentId = req.params.residentId;
    FrequentVisitor.find({
      "addedBy": residentId
    }, function (err, visitors) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Nothing Found"
        });
      } else {
        if (visitors.length == 0) {
          return res.json({
            error: true,
            message: "Nothing Found"
          });
        }
        visitors = visitors.map(function (visitor) {
          var rObj = {};
          rObj.name = visitor.name;
          rObj.token = visitor.token;
          rObj.contactPhone = visitor.contactPhone;
          rObj.expiryDate = visitor.expiryDate;
          return rObj;
        });
        res.json({
          error: false,
          data: visitors
        });
      }
    });
  });

  /**
       * @api {delete} /deleteFreqVisitor/:freqVisitorId Delete one frequent visitor
       * @apiVersion 1.0.0
       * @apiName deleteFreqVisitor
       * @apiGroup Frequent Visitor
       * @apiPermission Resident
       * @apiParam {String} freqVisitorId
       @apiSuccessExample {json} Success Example
       {
    "error": false,
    "message": "Successfully deleted"
  }

       */
  apiRoutes.delete('/deleteFreqVisitor/:freqVisitorId', auth('Resident'), function (req, res) {
    var freqVisitorId = req.params.freqVisitorId;
    FrequentVisitor.findByIdAndRemove(freqVisitorId, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Frequent Visitor could not be deleted"
        });
      } else {
        res.json({
          error: false,
          message: "Successfully deleted"
        });
      }
    });
  });

  /**
     * @api {post} /addOpinionPoll Add Opinion Poll
     * @apiVersion 1.0.0
     * @apiName addOpinionPoll
     * @apiGroup Poll
     * @apiPermission Admin
      @apiParam {String} question
      @apiParam {String} pollCloseDate
      @apiParam {Array(String)} options
      @apiParam {String} societyId
      @apiParam {String} addedBy AdminId
      @apiParamExample {json} Requestt Example
{
    "question": "What is real name?",
    "options": [
    "yuifdjhfdkhdj",
    "hhhhhhhhhhh",
    "aaaaaaaaaa",
    "jjjjjjjjjjjj",
    "yyyyyyyyyyyy"
    ],
    "societyId": "5785d1c521e3f068239e1d5d",
    "addedBy": "578529cea3b34e8c17dce78d"
}

  @apiSuccess {String} pollId Newly created poll Id
     */

  apiRoutes.post('/addOpinionPoll', auth('Resident'), function (req, res) {
    var opinionpoll = new OpinionPoll(req.body);
    opinionpoll.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Poll could not be added"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: opinionpoll.id
          }
        });
      }
    });
  });


  /**
     * @api {put} /respondToOpinionPoll/:pollId Respond to a poll
     * @apiVersion 1.0.0
     * @apiName respondToOpinionPoll
     * @apiGroup Poll
     * @apiPermission Resident
     @apiDescription Residents are allowed to submit a response for a poll only once
     @apiParam {String} pollId Through URl
      @apiParam {Number} optionSelected
      @apiParam {String} responsedBy Resident Id
      @apiParamExample {json} Request Example
      {
    "optionSelected": 3,
    "responsedBy": "57889a00e0a8c7bc1ebdb60c"
}
@apiSuccessExample {json} Success Response
{
  "error": true,
  "message": "Already Submitted the response"
}
     */

  apiRoutes.put('/respondToOpinionPoll/:pollId', auth('Resident'), function (req, res) {
    var pollId = req.params.pollId;
    OpinionPoll.findDuplicateResponse(pollId, req.body.responsedBy, function (err, doc) {
      if (err) {
        return res.json({
          error: true,
          message: "Some Internal error occured"
        });
      } else {
        if (doc.length > 0) {
          return res.json({
            error: true,
            message: "Already Submitted the response"
          });
        } else {
          OpinionPoll.findByIdAndUpdate(pollId, {
            $push: {
              "responses": req.body
            }
          }, {
            new: true
          }, function (err, poll) {
            if (err) {
              return res.json({
                error: true,
                message: "Could not be saved"
              });
            } else {
              res.json({
                error: false,
                message: "Successfully saved"
              });
            }
          });
        }
      }
    });
  });

  /**
     * @api {get} /getOpinionPollResponses/:pollId Get responses for a poll
     * @apiVersion 1.0.0
     * @apiName getOpinionPollResponses
     * @apiGroup Poll
     * @apiPermission Admin, Resident
     * @apiParam {String} pollId
      @apiSuccess {String} question
      @apiSuccess {Date} pollCreatedDate
      @apiSuccess {Date} pollCloseDate
      @apiSuccess {Array(String)} options
      @apiSuccess {Array(Objects)} responses
      @apiSuccess {String} responses.optionSelected
      @apiSuccess {String} responses.responseTime
      @apiSuccess {String} responses.responsedBy
      @apiSuccess {String} societyId
      @apiSuccess {String} addedBy Resident Id
      @apiSuccessExample {json} Success Example
      {
  "error": false,
  "data": {
    "_id": "578c9f9909609464132b3acb",
    "question": "Hi.......What is real name?",
    "societyId": "5785d1c521e3f068239e1d5d",
    "addedBy": "578529cea3b34e8c17dce78d",
    "responses": [
      {
        "responsedBy": "57889a00e0a8c7bc1ebdb60c",
        "optionSelected": 3,
        "_id": "578c9fa509609464132b3acc",
        "responseTime": "2016-07-18T09:21:41.334Z"
      },
      {
        "responsedBy": "57889a00e0a8c7bc1ebdb60d",
        "optionSelected": 3,
        "_id": "578cb4e480276c0c103cee89",
        "responseTime": "2016-07-18T10:52:20.282Z"
      }
    ],
    "options": [
      "yuifdjhfdkhdj",
      "hhhhhhhhhhh",
      "aaaaaaaaaa",
      "jjjjjjjjjjjj",
      "yyyyyyyyyyyy"
    ],
    "pollCreatedDate": "2016-07-18T09:21:29.088Z"
  }
}
     */


  apiRoutes.get('/getOpinionPollResponses/:pollId', auth(['Admin', 'Resident']), function (req, res) {
    var pollId = req.params.pollId;
    OpinionPoll.findById(pollId, function (err, poll) {
      if (err) {
        console.log(err);
        return re.json({
          error: true,
          message: "Poll could not be found"
        });
      } else {
        return res.json({
          error: false,
          data: poll
        });
      }
    });
  });


  /**
     * @api {put} /editOpinionPoll/:pollId Edit opinion poll
     * @apiVersion 1.0.0
     * @apiName editOpinionPoll
     * @apiGroup Poll
     * @apiPermission Admin
     * @apiParam {String} pollId
     * @apiParam {String} question
     * @apiParam {Array(String)} options
      @apiParamExample {json} Request Example
      {
      "question": "Hi.......What is your real name?"
      }
      @apiSuccess {String} question
      @apiSuccess {Date} pollCreatedDate
      @apiSuccess {Date} pollCloseDate
      @apiSuccess {Array(String)} options
      @apiSuccess {Array(Objects)} responses
      @apiSuccess {String} responses.optionSelected
      @apiSuccess {String} responses.responseTime
      @apiSuccess {String} responses.responsedBy
      @apiSuccess {String} societyId
      @apiSuccess {String} addedBy Resident Id
      @apiSuccessExample {json} Success Example
      {
  "error": false,
  "data": {
    "_id": "578c9f9909609464132b3acb",
    "question": "Hi.......What is your real name?",
    "societyId": "5785d1c521e3f068239e1d5d",
    "addedBy": "578529cea3b34e8c17dce78d",
    "responses": [
      {
        "responsedBy": "57889a00e0a8c7bc1ebdb60c",
        "optionSelected": 3,
        "_id": "578c9fa509609464132b3acc",
        "responseTime": "2016-07-18T09:21:41.334Z"
      },
      {
        "responsedBy": "57889a00e0a8c7bc1ebdb60d",
        "optionSelected": 3,
        "_id": "578cb4e480276c0c103cee89",
        "responseTime": "2016-07-18T10:52:20.282Z"
      }
    ],
    "options": [
      "yuifdjhfdkhdj",
      "hhhhhhhhhhh",
      "aaaaaaaaaa",
      "jjjjjjjjjjjj",
      "yyyyyyyyyyyy"
    ],
    "pollCreatedDate": "2016-07-18T09:21:29.088Z"
  }
}
     */
  apiRoutes.put('/editOpinionPoll/:pollId', auth('Admin'), function (req, res) {
    var pollId = req.params.pollId;
    OpinionPoll.findByIdAndUpdate(pollId, req.body, {
      new: true
    }, function (err, poll) {
      if (err) {
        console.log(err);
        return re.json({
          error: true,
          message: "Poll could not be found"
        });
      } else {
        res.json({
          error: false,
          data: poll
        });
      }
    });
  });


  /**
       * @api {get} /getOpinionPolls Get all opinion polls
       * @apiVersion 1.0.0
       * @apiName getOpinionPolls
       * @apiGroup Poll
       * @apiPermission Admin, Resident
       @apiSuccess {Array(Object)} data
       @apiSuccess {String} data.question
        @apiSuccess {Date} data.pollCreatedDate
        @apiSuccess {Date} data.pollCloseDate
        @apiSuccess {Array(String)} data.options
        @apiSuccess {Array(Objects)} data.responses
        @apiSuccess {String} data.responses.optionSelected
        @apiSuccess {String} data.responses.responseTime
        @apiSuccess {String} data.responses.responsedBy
        @apiSuccess {String} data.societyId
        @apiSuccess {String} data.addedBy Resident Id
        @apiSuccessExample {json} Success Example
        {
    "error": false,
    "data": [
      {
        "_id": "578c9f9909609464132b3acb",
        "question": "Hi.......What is real name?",
        "societyId": "5785d1c521e3f068239e1d5d",
        "addedBy": "578529cea3b34e8c17dce78d",
        "__v": 0,
        "responses": [
          {
            "responsedBy": "57889a00e0a8c7bc1ebdb60c",
            "optionSelected": 3,
            "_id": "578c9fa509609464132b3acc",
            "responseTime": "2016-07-18T09:21:41.334Z"
          },
          {
            "responsedBy": "57889a00e0a8c7bc1ebdb60d",
            "optionSelected": 3,
            "_id": "578cb4e480276c0c103cee89",
            "responseTime": "2016-07-18T10:52:20.282Z"
          }
        ],
        "options": [
          "yuifdjhfdkhdj",
          "hhhhhhhhhhh",
          "aaaaaaaaaa",
          "jjjjjjjjjjjj",
          "yyyyyyyyyyyy"
        ],
        "pollCreatedDate": "2016-07-18T09:21:29.088Z"
      },
      {
        "_id": "578cb54d80276c0c103cee8a",
        "question": "What is real name?",
        "societyId": "5785d1c521e3f068239e1d5d",
        "addedBy": "578529cea3b34e8c17dce78d",
        "__v": 0,
        "responses": [
          {
            "responsedBy": "57889a00e0a8c7bc1ebdb60c",
            "optionSelected": 3,
            "_id": "578cb55480276c0c103cee8b",
            "responseTime": "2016-07-18T10:54:12.808Z"
          }
        ],
        "options": [
          "yuifdjhfdkhdj",
          "hhhhhhhhhhh",
          "aaaaaaaaaa",
          "jjjjjjjjjjjj",
          "yyyyyyyyyyyy"
        ],
        "pollCreatedDate": "2016-07-18T10:54:05.895Z"
      },
      {
        "_id": "578ccb773922b40819dd33da",
        "question": "What is real name?",
        "societyId": "5785d1c521e3f068239e1d5d",
        "addedBy": "578529cea3b34e8c17dce78d",
        "__v": 0,
        "responses": [],
        "options": [
          "yuifdjhfdkhdj",
          "hhhhhhhhhhh",
          "aaaaaaaaaa",
          "jjjjjjjjjjjj",
          "yyyyyyyyyyyy"
        ],
        "pollCreatedDate": "2016-07-18T12:28:39.699Z"
      }
    ]
  }

       */

  apiRoutes.get('/getOpinionPolls', auth(['Admin','Resident']), function (req, res) {
    OpinionPoll.find({}, function (err, polls) {
      if (err) {
        console.log(err);
        return re.json({
          error: true,
          message: "Polls could not be found"
        });
      } else {
        res.json({
          error: false,
          data: polls
        });
      }
    });
  });

  /** @api {post} /addResidentDoc Add a new Resident document
     * @apiVersion 1.0.0
     * @apiName addResidentDoc
     * @apiGroup Resident document
     * @apiPermission Resident
     *@apiParam {String} docType
      @apiParam {String} note
      @apiParam {String} userDocKey
      @apiParam {String} userDocURL
      @apiParam {String} societyId
      @apiParam {String} addedBy Resident Id
      @apiParamExample {json} Request Example
      {
    "docType": "kkkkkkkk",
    "note": "jfkdhjkdfhkdjfs",
    "societyId": "5785d1c521e3f068239e1d5d",
    "addedBy": "578877021787272424e854f0"
      }
      @apiSuccess {String} docId Newly created doc Id
*/

  apiRoutes.post('/addResidentDoc', auth('Resident'), function (req, res) {
    var doc = new ResidentDocument(req.body);
    doc.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Error in uploading the doc"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: doc._id
          }
        });
      }
    });
  });

  /**
     * @api {get} /getResidentDocs/:societyId Get resident Documents
     * @apiVersion 1.0.0
     * @apiName getResidentDocs
     * @apiGroup Resident document
     * @apiPermission Resident
      @apiSuccessExample {json} Success Response
      {
  "error": false,
  "data": [
    {
      "_id": "578dc20a58ea9e6c2969a8db",
      "docType": "Pan card",
      "note": "jfkdhjkdfhkdjfs",
      "societyId": "5785d1c521e3f068239e1d5d",
      "addedBy": "578877021787272424e854f0",
      "__v": 0,
      "uploadDateTime": "2016-07-19T06:00:42.520Z"
    },
    {
      "_id": "578dc52593c00ae80964c2d5",
      "docType": "Pan card",
      "note": "jfkdhjkdfhkdjfs",
      "societyId": "5785d1c521e3f068239e1d5d",
      "addedBy": "578877021787272424e854f0",
      "__v": 0,
      "uploadDateTime": "2016-07-19T06:13:57.595Z"
    }
  ]
}
     */

  apiRoutes.get('/getResidentDocs/:societyId', auth('Resident'), function (req, res) {
    var societyId = req.params.societyId;
    ResidentDocument.find({
      "societyId": societyId
    }, function (err, doc) {
      if (err) {
        return res.json({
          error: true,
          message: "Error finding the documents"
        });
      } else {
        res.json({
          error: false,
          data: doc
        });
      }
    });
  });

  /**
       * @api {delete} /deleteResidentDoc/:docId Delete resident Documents
       * @apiVersion 1.0.0
       * @apiName deleteResidentDoc
       * @apiGroup Resident document
       * @apiPermission Resident
       @apiParam {String} docId
      @apiSuccessExample {json} Success Response
      {
        error: false,
        message: "Successfully deleted"
      }

       */


  apiRoutes.delete('/deleteResidentDoc/:docId', auth('Resident'), function (req, res) {
    var docId = req.params.docId;
    ResidentDocument.findByIdAndRemove(docId, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Error in deleting the document"
        });
      } else {
        res.json({
          error: false,
          message: "Successfully deleted"
        });
      }
    });
  });

  /**
    * @api {post} /addClassifiedAd Add new classified Ad
     * @apiVersion 1.0.0
     * @apiName addClassifiedAd
     * @apiGroup Classified Ad
     * @apiPermission Resident
      @apiParam {Boolean} isOffering
      @apiParam {String} for
      @apiParam {String} category
      @apiParam {String} title
      @apiParam {Number} price only if isOffering true
      @apiParam {String} [postAs] Nickname
      @apiParam {String} contactEmail
      @apiParam {Date} from
      @apiParam {Date} validTill
      @apiParam {Array(String)} pictureURLs
      @apiParam {String} description
      @apiParam {String} societyId
      @apiParam {String} addedBy
      @apiParamExample {json} Request Example
      {
    "isOffering": true,
    "title": "Hellsdssdo",
    "price": 7897997,
    "pictureURLs": ["jksadhkjsda", "jdshjksdhksjah"],
    "societyId": "5785d1c521e3f068239e1d5d",
    "addedBy": "578877021787272424e854f0"
}
@apiSuccess {String} adId newly created ad id
    */


  apiRoutes.post('/addClassifiedAd', auth('Resident'), function (req, res) {
    var ad = new Classified(req.body);
    ad.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be saved"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: ad.id
          }
        });
      }
    });
  });

  /**
    * @api {get} /getClassifiedAds/:residentId Get all the ads posted by a resident
    * @apiVersion 1.0.0
     * @apiName getClassifiedAds
     * @apiGroup Classified Ad
     * @apiPermission Resident
     * @apiParam {String} residentId
      @apiSuccess {Boolean} isOffering
      @apiSuccess {String} for
      @apiSuccess {String} category
      @apiSuccess {String} title
      @apiSuccess {Number} price only if isOffering true
      @apiSuccess {String} [postAs] Nickname
      @apiSuccess {String} contactEmail
      @apiSuccess {Date} from
      @apiSuccess {Date} validTill
      @apiSuccess {Array(String)} pictureURLs
      @apiSuccess {String} description
      @apiSuccess {String} societyId
      @apiSuccess {String} addedBy
      @apiSuccessExample {json} Success Example
      {
  "error": false,
  "data": [
    {
      "_id": "578dcc832bbffc5000de0099",
      "isOffering": true,
      "title": "Hellsdssdo",
      "price": 7897997,
      "societyId": "5785d1c521e3f068239e1d5d",
      "addedBy": "578877021787272424e854f0",
      "__v": 0,
      "pictureURLs": [
        "jksadhkjsda",
        "jdshjksdhksjah"
      ],
      "from": "2016-07-19T06:45:23.682Z"
    }
  ]
}

*/

  apiRoutes.get('/getClassifiedAds/:residentId', auth('Resident'), function (req, res) {
    var residentId = req.params.residentId;
    Classified.find({
      "addedBy": residentId
    }, function (err, ad) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not get anything"
        });
      } else {
        res.json({
          error: false,
          data: ad
        });
      }
    });
  });


  /**
      * @api {put} /editClassifedAd/:adId Edit a classified Ad
      * @apiVersion 1.0.0
       * @apiName editClassifedAd
       * @apiGroup Classified Ad
       * @apiPermission Resident
       * @apiParam {String} adId
        @apiParam {String} for
        @apiParam {String} category
        @apiParam {String} title
        @apiParam {Number} [price] only if isOffering true
        @apiParam {String} [postAs] Nickname
        @apiParam {String} contactEmail
        @apiParam {Date} from
        @apiParam {Date} validTill
        @apiParam {Array(String)} pictureURLs
        @apiParam {String} description
        @apiParamExample  {json} Request Example
        {
        "pictureURLs": [
          "jksadhkjsda",
          "jdshjksdhksjah",
          "654564654654"
        ]
      }

    @apiSuccessExample {json} Success Response
      {
    "error": false,
    "data": {
      "_id": "578dcc5e2bbffc5000de0098",
      "isOffering": true,
      "title": "Hello",
      "price": 7897997,
      "societyId": "5785d1c521e3f068239e1d5d",
      "addedBy": "578877021787272424e854f0",
      "__v": 0,
      "pictureURLs": [
        "jksadhkjsda",
        "jdshjksdhksjah",
        "654564654654"
      ],
      "from": "2016-07-19T06:44:46.530Z"
    }
  }

       */
  apiRoutes.put('/editClassifedAd/:adId', auth('Resident'), function (req, res) {
    var adId = req.params.adId;
    Classified.findByIdAndUpdate(adId, req.body, {
      new: true
    }, function (err, ad) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: ad
        });
      }
    });
  });

  /**
     * @api {delete} /deleteClassifedAd/:adId Delete resident ad
     * @apiVersion 1.0.0
     * @apiName deleteResidentDoc
     * @apiGroup Resident document
     * @apiPermission Resident
     @apiParam {String} adId
    @apiSuccessExample {json} Success Response
    {
      error: false,
      message: "Successfully deleted"
    }

     */

  apiRoutes.delete('/deleteClassifedAd/:adId', auth('Resident'), function (req, res) {
    var adId = req.params.adId;
    Classified.findByIdAndRemove(adId, function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Error in deleting the ad"
        });
      } else {
        res.json({
          error: false,
          message: "Successfully deleted"
        });
      }
    });
  });

  apiRoutes.post('/createContact', auth('Resident'), function (req, res) {
    var contact = new Contact(req.body);

    contact.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Oops! Some error occured"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: contact.id
          }
        });
      }
    });
  });

  apiRoutes.get('/getMyContacts/:societyId/:userId', function (req, res) {

    var societyId = req.params.societyId;
    var userId = req.params.userId;

    Contact.find({
      "openedBy": userId,
      "societyId": societyId
    }, function (err, contacts) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not find any result"
        });
      } else {
        res.json({
          error: false,
          data: contacts.map(function (contact) {
            var robj = {};
            robj.id = contact.id;
            robj.category = contact.category;
            robj.status = contact.status;
            robj.description = contact.description;
            robj.dateOpened = contact.dateOpened;
            robj.subject = contact.subject;
            robj.openedBy = contact.openedBy;
            return robj;
          })
        });
      }
    });
  });

  // Most Critical one :)
  apiRoutes.get('/getContacts/', function (req, res) {
    var societyId = req.query.societyId; // must
    var result = [];
    var query;
    if (req.query.status && !req.query.category && !req.query.block && !req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "status": req.query.status
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo'
        });
    } else if (req.query.category && !req.query.status && !req.query.block && !req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "category": req.query.category
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo'
        });
    } else if (!req.query.status && !req.query.category && req.query.block && !req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            block: req.query.block
          }
        });
    } else if (!req.query.status && !req.query.category && !req.query.block && req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            flatNo: req.query.flatNo
          }
        })
    } else if (req.query.status && req.query.category && !req.query.block && !req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "status": req.query.status,
          "category": req.query.category
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo'
        });
    } else if (!req.query.status && req.query.category && req.query.block && !req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "category": req.query.category
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            block: req.query.block
          }
        });
    } else if (!req.query.status && !req.query.category && req.query.block && req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            block: req.query.block,
            flatNo: req.query.flatNo
          }
        });
    } else if (req.query.status && !req.query.category && req.query.block && !req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "status": req.query.status
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            flatNo: req.query.flatNo
          }
        });
    } else if (req.query.status && !req.query.category && !req.query.block && req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "status": req.query.status
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            flatNo: req.query.flatNo
          }
        });
    } else if (!req.query.status && req.query.category && !req.query.block && req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "category": req.query.category
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            flatNo: req.query.flatNo
          }
        });
    } else if (!req.query.status && req.query.category && !req.query.block && req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "category": req.query.category
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            flatNo: req.query.flatNo
          }
        });
    } else if (req.query.status && req.query.category && req.query.block && !req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "status": req.query.status,
          "category": req.query.category
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo'
        });
    } else if (!req.query.status && req.query.category && req.query.block && req.query.flatNo) {
      query = Contact.find({
          "societyId": societyId,
          "category": req.query.category
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            block: req.query.block,
            flatNo: req.query.flatNo
          }
        });
    } else if (req.query.block && req.query.flatNo && req.query.status && !req.query.category) {
      query = Contact.find({
          "societyId": societyId,
          "status": req.query.status
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            block: req.query.block,
            flatNo: req.query.flatNo
          }
        });
    } else if (!req.query.block && req.query.flatNo && req.query.status && req.query.category) {
      query = Contact.find({
          "societyId": societyId,
          "status": req.query.status
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            flatNo: req.query.flatNo
          }
        });
    } else {
      query = Contact.find({
          "societyId": societyId,
          "status": req.query.status,
          "category": req.query.category
        })
        .populate({
          path: 'openedBy',
          select: 'name block flatNo',
          match: {
            block: req.query.block,
            flatNo: req.query.flatNo
          }
        });
    }
    query.exec(function (err, contacts) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "No data found"
        });
      } else {
        contacts.forEach(function (contact) {
          if (contact.openedBy) {
            result.push(contact);
          }
        });
        res.json({
          error: false,
          data: result
        });
      }
    });
  });

  apiRoutes.put('/changeContactStatus/:contactId', function (req, res) {
    var contactId = req.params.contactId;
    Contact.findByIdAndUpdate(contactId, req.body, {
      new: true
    }, function (err, contact) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be updated"
        });
      } else {
        res.json({
          error: false,
          data: {
            id: contact.id
          }
        });
      }
    });
  });

  apiRoutes.post('/replyToContact', function (req, res) {
    var userId = req.body.userId;
    var message = req.body.message;
    var contactId = req.body.contactId;
    Contact.findById(contactId, function (err, contact) {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          message: "No contacts found with this Id"
        });
      } else {
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
  });

apiRoutes.post('/addService', function (req, res) {
  var serviceoffered = new ServiceOffered(req.body);
  serviceoffered.save(function (err) {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        message: "Could not be saved"
      });
    } else {
      res.json({
        error: false,
        data: {
          id: serviceoffered.id
        }
      });
    }
  });
});

apiRoutes.get('/getServices/:societyId', function(req, res) {
    var societyId = req.params.societyId;
    ServiceOffered
        .find({societyId: societyId})
        .populate('serviceProvider')
        .exec(function(err, services) {
            if (err) {
                console.log(err);
                return res.json({
                    error: true,
                    message: "Could not get any services"
                });
            } else {
                res.json({
                    error: false,
                    data: services
                });
            }
        });
});

apiRoutes.delete('/deleteService/:serviceId', function (req, res) {
  var serviceId = req.params.serviceId;

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
});

apiRoutes.put('/editService/:serviceId', function (req, res) {
  var serviceId = req.params.serviceId;
  ServiceOffered.findByIdAndUpdate(serviceId, req.body, {new: true}, function (err, services) {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        message: "Could not be saved"
      });
    } else {
      res.json({
        error: false,
        data: services
      });
    }
  });
});

apiRoutes.post('/addProvider', function (req, res) {
  var serviceProvider = new ServiceProvider(req.body);
  serviceProvider.save(function (err) {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        message: "Could not be saved"
      });
    } else {
      res.json({
        error: false,
        data: {
          id: serviceProvider.id
        }
      });
    }
  });
});

apiRoutes.put('/changeProviderStatus/:providerId', function (req, res) {
  var status = req.body.status;
  var providerId = req.params.providerId;

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
});

apiRoutes.delete('/deleteProvider/:providerId', function (req, res) {
  var providerId = req.params.providerId;
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
});

apiRoutes.put('/updateResidentService', function (req, res) {
  var userId = req.params.userId;
  var updater = {
    services: req.body.services
  };
  User.findByIdAndUpdate(userId, updater , {new: true}, function (err, user){
    if(err){
      return res.json({
        error: true,
        message: "Could not be updated"
      });
    } else {
      res.json({
        error: false,
        data: user
      });
    }
  });
});

apiRoutes.get('/getReisdentServices/:userId', function (req, res) {
  var userId = req.params.userId;
  User.findById(userId, function (err, user) {
    if(err){
      console.log(err);
      return res.json({
        error: true,
        message: "Could not get any result"
      });
    } else {
      res.json({
        error: false,
        data: user.services
      });
    }
  });
});

apiRoutes.post('/createServiceRequest', function (req, res) {
  var servicerequest = new ServiceRequest(req.body);
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
});

apiRoutes.get('/getResidentServiceRequests/:userId', function (req, res) {
  var userId = req.params.userId;
  ServiceRequest
    .find({requestedBy: userId})
    .populate('providerAllocated')
    .exec(function (err, results) {
      if(err){
        console.log(err);
        return res.json({
          error: true,
          message: "Could not be saved"
        });
      } else {
        res.json({
          error: false,
          data: results
        });
      }
    });
});

apiRoutes.get('/getSocietyServiceRequests/:societyId', function (req, res) {
  var societyId = req.params.societyId;
  ServiceRequest
  .find({societyId: societyId})
  .populate('requestedBy', 'name block flatNo')
  .populate('providerAllocated')
  .exec(function (err, results) {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        message: "Could not find any service requests"
      });
    } else {
      if (results.length == 0) {
        return res.json({
          error: true,
          message: "Could not find any service requests"
        });
      } else {
        res.json({
          error: false,
          data: results
        });
      }
    }
  });
});


apiRoutes.put('/updateSocietyServiceRequest/:serviceRequestId', function (req, res) {
  var serviceRequestId = req.params.serviceRequestId;
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
});


module.exports = apiRoutes;
