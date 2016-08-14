define({ "api": [
  {
    "type": "post",
    "url": "/addboardmember",
    "title": "Create one or multiple board members at a time",
    "version": "1.0.0",
    "name": "addBoardMember",
    "group": "Board_Member",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>It supports batch insert. To create one boardmember send one object. To create multiple boardmembers send Array of objects.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "profilePicURL",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "profilePicKey",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Admin Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "  [{\n \"name\": \"Acharya\",\n \"societyId\": \"5785d1c521e3f068239e1d5d\",\n \"createdBy\": \"578529cea3b34e8c17dce78d\",\n \"contactEmail\": \"i.am.sandeep@gmail.com\",\n \"contactPhone\": 89765454\n},{\n \"name\": \"jkasdhkdsj\",\n \n \"societyId\": \"5785d1c521e3f068239e1d5d\",\n \"createdBy\": \"578529cea3b34e8c17dce78d\",\n \"contactEmail\": \"i.am.sandeep@gmail.com\",\n \"contactPhone\": 89765454\n}\n}]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "boardMemberId",
            "description": "<p>Id of the newly created board members</p>"
          }
        ]
      }
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Board_Member"
  },
  {
    "type": "put",
    "url": "/editboardmember/:boardMemberID",
    "title": "Edit one Board Member",
    "version": "1.0.0",
    "name": "editBoardMember",
    "group": "Board_Member",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardMemberID",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\"contactEmail\": \"11111111111@gmail.com\",\n\"contactPhone\": 11111111111\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success Example",
          "content": "      {\n  \"error\": false,\n  \"data\": {\n    \"_id\": \"5787883b577b421c2e393258\",\n    \"name\": \"Acharya\",\n    \"contactPhone\": 11111111111,\n    \"contactEmail\": \"11111111111@gmail.com\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Board_Member"
  },
  {
    "type": "get",
    "url": "/getboardmembers/:societyId",
    "title": "Get all the board memebers for a society",
    "version": "1.0.0",
    "name": "getBoardMembers",
    "group": "Board_Member",
    "permission": [
      {
        "name": "Admin, Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profilePicURL",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profilePicKey",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response",
          "content": "      {\n  \"error\": false,\n  \"data\": [\n    {\n      \"_id\": \"5787883b577b421c2e393258\",\n      \"name\": \"Acharya\",\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"createdBy\": \"578529cea3b34e8c17dce78d\",\n      \"__v\": 0,\n      \"contactPhone\": 11111111111,\n      \"contactEmail\": \"11111111111@gmail.com\"\n    },\n    {\n      \"_id\": \"57878888789d8df40cedbe38\",\n      \"name\": \"Acharya\",\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"createdBy\": \"578529cea3b34e8c17dce78d\"\n    },\n    {\n      \"_id\": \"57878888789d8df40cedbe39\",\n      \"name\": \"jkasdhkdsj\",\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"createdBy\": \"578529cea3b34e8c17dce78d\"\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Board_Member"
  },
  {
    "type": "post",
    "url": "/addClassifiedAd",
    "title": "Add new classified Ad",
    "version": "1.0.0",
    "name": "addClassifiedAd",
    "group": "Classified_Ad",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isOffering",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "for",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>only if isOffering true</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "postAs",
            "description": "<p>Nickname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "from",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "validTill",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(String)",
            "optional": false,
            "field": "pictureURLs",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "      {\n    \"isOffering\": true,\n    \"title\": \"Hellsdssdo\",\n    \"price\": 7897997,\n    \"pictureURLs\": [\"jksadhkjsda\", \"jdshjksdhksjah\"],\n    \"societyId\": \"5785d1c521e3f068239e1d5d\",\n    \"addedBy\": \"578877021787272424e854f0\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "adId",
            "description": "<p>newly created ad id</p>"
          }
        ]
      }
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Classified_Ad"
  },
  {
    "type": "put",
    "url": "/editClassifedAd/:adId",
    "title": "Edit a classified Ad",
    "version": "1.0.0",
    "name": "editClassifedAd",
    "group": "Classified_Ad",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "for",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>only if isOffering true</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "postAs",
            "description": "<p>Nickname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "from",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "validTill",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(String)",
            "optional": false,
            "field": "pictureURLs",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "  {\n  \"pictureURLs\": [\n    \"jksadhkjsda\",\n    \"jdshjksdhksjah\",\n    \"654564654654\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "    {\n  \"error\": false,\n  \"data\": {\n    \"_id\": \"578dcc5e2bbffc5000de0098\",\n    \"isOffering\": true,\n    \"title\": \"Hello\",\n    \"price\": 7897997,\n    \"societyId\": \"5785d1c521e3f068239e1d5d\",\n    \"addedBy\": \"578877021787272424e854f0\",\n    \"__v\": 0,\n    \"pictureURLs\": [\n      \"jksadhkjsda\",\n      \"jdshjksdhksjah\",\n      \"654564654654\"\n    ],\n    \"from\": \"2016-07-19T06:44:46.530Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Classified_Ad"
  },
  {
    "type": "get",
    "url": "/getClassifiedAds/:residentId",
    "title": "Get all the ads posted by a resident",
    "version": "1.0.0",
    "name": "getClassifiedAds",
    "group": "Classified_Ad",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "residentId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isOffering",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "for",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>only if isOffering true</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "postAs",
            "description": "<p>Nickname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "from",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "validTill",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(String)",
            "optional": false,
            "field": "pictureURLs",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "      {\n  \"error\": false,\n  \"data\": [\n    {\n      \"_id\": \"578dcc832bbffc5000de0099\",\n      \"isOffering\": true,\n      \"title\": \"Hellsdssdo\",\n      \"price\": 7897997,\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"addedBy\": \"578877021787272424e854f0\",\n      \"__v\": 0,\n      \"pictureURLs\": [\n        \"jksadhkjsda\",\n        \"jdshjksdhksjah\"\n      ],\n      \"from\": \"2016-07-19T06:45:23.682Z\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Classified_Ad"
  },
  {
    "type": "post",
    "url": "/addemergencycontact",
    "title": "Create a new Emergency Contact",
    "version": "1.0.0",
    "name": "addEmergencyContact",
    "group": "Emergency_Contact",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>Add a new Emergency Contact with all the necessary details by the  admin</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the emergency contact (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array(contacts)",
            "optional": false,
            "field": "contacts",
            "description": "<p>Array of contacts</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contacts.organization",
            "description": "<p>Name of the org (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contatcs.contactPhone",
            "description": "<p>Number of the org (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": "<p>(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>(Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "       {\n    \"type\": \"Police\",\n\n    \"contacts\":[{\n        \"organization\": \"Staton2\",\n        \"contactPhone\": 78978323244\n    }, {\n        \"organization\": \"Staton3\",\n        \"contactPhone\": 7897897\n    }, {\n        \"organization\": \"Staton4\",\n        \"contactPhone\": 7897897\n    }, {\n        \"organization\": \"Staton5\",\n        \"contactPhone\": 7897897\n    }],\n\n    \"societyId\": \"5785e7b5b7585d9426694023\",\n\n    \"createdBy\": \"578529ffa3b34e8c17dce78e\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Emergnecy contact Id</p>"
          }
        ]
      }
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Emergency_Contact"
  },
  {
    "type": "delete",
    "url": "/deleteemergencycontact/:emId",
    "title": "Delete a Emergency Contact",
    "version": "1.0.0",
    "name": "deleteEmergencyContact",
    "group": "Emergency_Contact",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>Deleting a Emergency Contact by the Admin</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emeregencyContactId",
            "description": "<p>(Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "     {\n  \"error\": false,\n  \"data\": \"Emergency Contact successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Emergency_Contact"
  },
  {
    "type": "put",
    "url": "/editemergencycontact/:emId",
    "title": "Update a Emergency Contact",
    "version": "1.0.0",
    "name": "editEmergencyContact",
    "group": "Emergency_Contact",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>Updating a Emergency Contact by the Admin. Contacts are overridden. Each request should contain all the contacts object</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emergencyContactId",
            "description": "<p>Through Url (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the emergency contact</p>"
          },
          {
            "group": "Parameter",
            "type": "Array(contacts)",
            "optional": false,
            "field": "contacts",
            "description": "<p>Array of contacts</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contacts.organization",
            "description": "<p>Name of the org (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contatcs.contactPhone",
            "description": "<p>Number of the org (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "     {\n  \"error\": false,\n  \"data\": {\n    \"_id\": \"5787433d5c6c78040e86c997\",\n    \"type\": \"Police\",\n    \"societyId\": \"5785e7b5b7585d9426694023\",\n    \"createdBy\": \"578529ffa3b34e8c17dce78e\",\n    \"__v\": 0,\n    \"contacts\": [\n      {\n        \"organization\": \"Jadavpur\",\n        \"contactPhone\": 8979889694,\n        \"_id\": \"5787668b8d7320d82b918b09\"\n      },\n      {\n        \"organization\": \"Anandapur\",\n        \"contactPhone\": 8979889694,\n        \"_id\": \"5787668b8d7320d82b918b08\"\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Emergency_Contact"
  },
  {
    "type": "get",
    "url": "/getemergencycontacts/:societyId",
    "title": "Get Emergency Contacts of a society",
    "version": "1.0.0",
    "name": "getEmergencyContacts",
    "group": "Emergency_Contact",
    "permission": [
      {
        "name": "Admin, Resident"
      }
    ],
    "description": "<p>Get all the Emergency Contacts of a particular society</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": "<p>(Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "        {\n  \"error\": false,\n  \"data\": [\n    {\n      \"_id\": \"5787433d5c6c78040e86c997\",\n      \"type\": \"Police\",\n      \"societyId\": \"5785e7b5b7585d9426694023\",\n      \"createdBy\": \"578529ffa3b34e8c17dce78e\",\n      \"__v\": 0,\n      \"contacts\": [\n        {\n          \"organization\": \"Staton2\",\n          \"contactPhone\": 78978323244,\n          \"_id\": \"5787433d5c6c78040e86c99b\"\n        },\n        {\n          \"organization\": \"Staton3\",\n          \"contactPhone\": 7897897,\n          \"_id\": \"5787433d5c6c78040e86c99a\"\n        }\n      ]\n    },\n    {\n      \"_id\": \"5787603631aea8b02023a404\",\n      \"type\": \"Ambulance\",\n      \"societyId\": \"5785e7b5b7585d9426694023\",\n      \"createdBy\": \"578529ffa3b34e8c17dce78e\",\n      \"__v\": 0,\n      \"contacts\": [\n        {\n          \"organization\": \"Staton2\",\n          \"contactPhone\": 78978323244,\n          \"_id\": \"5787603631aea8b02023a408\"\n        }\n      ]\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Emergency_Contact"
  },
  {
    "type": "post",
    "url": "/addfreqvisitor",
    "title": "Add one frequent visitor",
    "version": "1.0.0",
    "name": "addfrequentvisitor",
    "group": "Frequent_Visitor",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "description": "<p>Add one frequent visitor</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(Number)",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expiryDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": "<p>ResidentId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "          {\n    \"name\": \"Sandeep\",\n    \"expiryDate\":\"Fri Jul 15 2016 18:04:31\",\n    \"contactPhone\": [\n        8977897987,897987987\n    ],\n  \n    \"token\": \"fsiuhiusdhiushdfiuohsdfouhdsfiudsifdsjfisdjaoja\",\n    \"societyId\": \"5785d1c521e3f068239e1d5d\",\n    \"addedBy\": \"578877021787272424e854f0\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "freqVisitorID",
            "description": "<p>Id of the newly created Visitor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n  \"error\": false,\n  \"data\": {\n    \"id\": \"578cc87dcc170e3413673c65\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Frequent_Visitor"
  },
  {
    "type": "delete",
    "url": "/deleteFreqVisitor/:freqVisitorId",
    "title": "Delete one frequent visitor",
    "version": "1.0.0",
    "name": "deleteFreqVisitor",
    "group": "Frequent_Visitor",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "freqVisitorId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Example",
          "content": "     {\n  \"error\": false,\n  \"message\": \"Successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Frequent_Visitor"
  },
  {
    "type": "post",
    "url": "/getfreqvisitor/:residentId",
    "title": "Add one frequent visitor",
    "version": "1.0.0",
    "name": "getfreqvisitor",
    "group": "Frequent_Visitor",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "residentId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(Number)",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiryDate",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "      {\n  \"error\": false,\n  \"data\": [\n    {\n      \"name\": \"kkkkkkkkkkk\",\n      \"token\": \"fsiuhiusdhiushdfiuohsdfouhdsfiudsifdsjfisdjaoja\",\n      \"contactPhone\": [\n        8977897987,\n        897987987\n      ],\n      \"expiryDate\": \"2016-07-15T12:34:31.000Z\"\n    },\n    {\n      \"name\": \"aaaaaaaaaaaaaaaaaaaaaaaaa\",\n      \"token\": \"fsiuhiusdhiushdfiuohsdfouhdsfiudsifdsjfisdjaoja\",\n      \"contactPhone\": [\n        8977897987,\n        897987987\n      ],\n      \"expiryDate\": \"2016-07-15T12:34:31.000Z\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Frequent_Visitor"
  },
  {
    "type": "post",
    "url": "/addemployee",
    "title": "Create one employee",
    "version": "1.0.0",
    "name": "addemployee",
    "group": "Manage_Employees",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "description": "<p>Add one employee</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dob",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "regularSchedule",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": "<p>ResidentId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"name\": \"sujit\",\n  \"gender\": \"male\",\n  \"addedBy\": \"57889a00e0a8c7bc1ebdb60c\",\n  \"societyId\": \"5785d1c521e3f068239e1d5d\",\n  \"dob\": \"Fri Jul 15 2016 12:41:30\",\n  \"contactPhone\": 789789789,\n  \"role\": \"Servent\",\n  \"regularSchedule\": \"Morning\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "employeeId",
            "description": "<p>Newly created employee ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "      {\n  \"error\": false,\n  \"data\": {\n    \"id\": \"578cbd2bff1377cc206e2c37\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Manage_Employees"
  },
  {
    "type": "delete",
    "url": "/deleteEmployee/:residentEmpID",
    "title": "Delete one employee",
    "version": "1.0.0",
    "name": "deleteEmployee",
    "group": "Manage_Employees",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "description": "<p>Delete employee for a resident</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "residentEmpId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": " {\n\"error\": false,\n\"message\": \"Employee successfully deleted\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Manage_Employees"
  },
  {
    "type": "get",
    "url": "/getemployees/:residentId",
    "title": "Get employees for a resident",
    "version": "1.0.0",
    "name": "getemployees",
    "group": "Manage_Employees",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "description": "<p>Get employees for a resident</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "residentId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "dob",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "regularSchedule",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "        {\n  \"error\": false,\n  \"data\": [\n    {\n      \"name\": \"sujit\",\n      \"gender\": \"male\",\n      \"dob\": \"2016-07-15T07:11:30.000Z\",\n      \"contactPhone\": 789789789,\n      \"role\": \"uuu\",\n      \"regularSchedule\": \"Morning\"\n    },\n    {\n      \"name\": \"sujit\",\n      \"gender\": \"male\",\n      \"dob\": \"2016-07-15T07:11:30.000Z\",\n      \"contactPhone\": 789789789,\n      \"role\": \"uuu\",\n      \"regularSchedule\": \"Morning\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Manage_Employees"
  },
  {
    "type": "post",
    "url": "/addsociety",
    "title": "Create a new Society",
    "version": "1.0.0",
    "name": "addSociety",
    "group": "Manage_Societies",
    "permission": [
      {
        "name": "Super Admin"
      }
    ],
    "description": "<p>Add a new society with all the necessary details by the super admin</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyName",
            "description": "<p>Name of the society (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyAddress",
            "description": "<p>Detailed address of the society (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "enum",
            "optional": false,
            "field": "status",
            "defaultValue": "active",
            "description": "<p>active/inactive default: active</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "locLat",
            "description": "<p>Lattitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "locLong",
            "description": "<p>Longitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactPerson",
            "description": "<p>(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(Number)",
            "optional": false,
            "field": "contactPhone",
            "description": "<p>(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array(String)",
            "optional": false,
            "field": "modulesSubscribed",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "approvedPAX",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "merchId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "merchKey",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "merchSalt",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(String)",
            "optional": false,
            "field": "services",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Add-Society-Example:",
          "content": "{\n        \"societyName\": \"Obhishikta\",\n        \"societyAddress\": \"Kalyani\",\n        \"contactPerson\": \"Sandeep Acharya\",\n        \"contactEmail\": \"dsdsjk@kdsjsk.com\",\n        \"locLat\": 8979.44,\n        \"locLong\": 8798798.4,\n        \"approvedPAX\": 897789,\n        \"merchSalt\": \"6454\",\n        \"merchKey\": \"879498\",\n        \"services\": [\n          \"ksdljjksd\",\n          \"jsdksdj\"\n        ],\n        \"modulesSubscribed\": [\n          \"hshdjhds\",\n          \"kdjfolskfj\"\n        ],\n        \"contactPhone\": [\n          7897897897,\n          9879874155\n        ]\n      }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The new society ID.</p>"
          }
        ]
      }
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Manage_Societies"
  },
  {
    "type": "put",
    "url": "/editsociety/:id",
    "title": "Update the Society",
    "version": "1.0.0",
    "name": "editSociety",
    "group": "Manage_Societies",
    "permission": [
      {
        "name": "Super Admin, Admin"
      }
    ],
    "description": "<p>Update the society details, all properties must be sent</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique Society id (through URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyName",
            "description": "<p>Name of the society</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyAddress",
            "description": "<p>Detailed address of the society</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "locLat",
            "description": "<p>Lattitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "locLong",
            "description": "<p>Longitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactPerson",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(Number)",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(String)",
            "optional": false,
            "field": "modulesSubscribed",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "approvedP",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "merchId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "merchKey",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "merchSalt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Update Format",
          "content": "{\n         \"societyName\": \"Obhishikta\",\n         \"societyAddress\": \"Kalyani\",\n         \"contactPerson\": \"Sandeep Acharya\",\n         \"contactEmail\": \"dsdsjk@kdsjsk.com\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "society",
            "description": "<p>Newly updated society object with the properties</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {\n  \"error\": false,\n  \"data\": {\n    \"_id\": \"5785e7b5b7585d9426694023\",\n    \"societyName\": \"Obhishikta\",\n    \"societyAddress\": \"Kalyani\",\n    \"contactPerson\": \"Sandeep Acharya\",\n    \"contactEmail\": \"i.am.sandeep.acharya@gmail.com\",\n    \"locLat\": \"8979.44\",\n    \"locLong\": \"8798798.4\",\n    \"approvedPAX\": 897789,\n    \"merchKey\": 879498,\n    \"merchSalt\": \"6454\",\n    \"__v\": 0,\n    \"services\": [\n      \"ksdljjksd\",\n      \"jsdksdj\"\n    ],\n    \"modulesSubscribed\": [\n      \"hshdjhds\",\n      \"kdjfolskfj\"\n    ],\n    \"contactPhone\": [\n      7897897897,\n      9879874155\n    ],\n    \"status\": \"active\",\n    \"joinDate\": \"2016-07-13T07:03:17.214Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Manage_Societies"
  },
  {
    "type": "get",
    "url": "/getsocietydetails/:id",
    "title": "Read data of a Society",
    "version": "1.0.0",
    "name": "getSocietyDetails",
    "group": "Manage_Societies",
    "permission": [
      {
        "name": "Super Admin, Admin"
      }
    ],
    "description": "<p>Get the details of the Society</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique Society id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "societyName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "societyAddress",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locLat",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locLong",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contactPerson",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(String)",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(String)",
            "optional": false,
            "field": "modulesSubscribed",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "approvedPAX",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notFound",
            "description": "<p>The <code>id</code> of the Society was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Manage_Societies"
  },
  {
    "type": "get",
    "url": "/getsocietylist",
    "title": "Get all the societies",
    "version": "1.0.0",
    "name": "getSocietyList",
    "group": "Manage_Societies",
    "permission": [
      {
        "name": "Super Admin"
      }
    ],
    "description": "<p>Get all the societies brief details</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array(Society)",
            "optional": false,
            "field": "Breif",
            "description": "<p>society information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "societyName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "societyAddress",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contactPerson",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contactEmail",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(Number)",
            "optional": false,
            "field": "contactPhone",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "           \n           {\n  \"error\": false,\n  \"data\": [\n    {\n      \"id\": \"5785d1c521e3f068239e1d5d\",\n      \"societyName\": \"Urbana\",\n      \"societyAddress\": \"Kolkata\",\n      \"contactPerson\": \"Sandeep Acharya\",\n      \"contactEmail\": \"dsdsjk@kdsjsk.com\",\n      \"contactPhone\": [\n        7897897897,\n        9879874155\n      ]\n    },\n    {\n      \"id\": \"5785e7b5b7585d9426694023\",\n      \"societyName\": \"Obhishikta\",\n      \"societyAddress\": \"Kalyani\",\n      \"contactPerson\": \"Sandeep Acharya\",\n      \"contactEmail\": \"i.am.sandeep.acharya@gmail.com\",\n      \"contactPhone\": [\n        7897897897,\n        9879874155\n      ]\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Manage_Societies"
  },
  {
    "type": "post",
    "url": "/addnotice",
    "title": "Create a new Notice",
    "version": "1.0.0",
    "name": "addNotice",
    "group": "Notice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>Add a new notice with all the necessary details by the  admin</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Notice Subject (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Notice Content (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dateCreated",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "reminderDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": "<p>(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Admin Id (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the newly created notice</p>"
          }
        ]
      }
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Notice"
  },
  {
    "type": "delete",
    "url": "/deletenotice/:noticeId",
    "title": "Delete a notice",
    "version": "1.0.0",
    "name": "deleteNotice",
    "group": "Notice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>Updating a notice by the Admin</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "noticeId",
            "description": "<p>(Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "     {\n  \"error\": false,\n  \"data\": \"Notice successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Notice"
  },
  {
    "type": "put",
    "url": "/editnotice/:noticeId",
    "title": "Update a notice",
    "version": "1.0.0",
    "name": "editNotice",
    "group": "Notice",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>Updating a notice by the Admin</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "noticeId",
            "description": "<p>(Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "     {\n  \"error\": false,\n  \"data\": {\n    \"_id\": \"578733748cba62ec0c49f8bc\",\n    \"subject\": \"jiiiiiiiiiiiii111111UUw\",\n    \"content\": \"kjdshkjskjssjdlsdla\",\n    \"societyId\": \"57860082a4d591101e2d0604\",\n    \"createdBy\": \"578529ffa3b34e8c17dce78e\",\n    \"__v\": 0,\n    \"dateCreated\": \"2016-07-14T06:38:44.702Z\",\n    \"reminderDate\": \"2016-07-14T06:38:44.702Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Notice"
  },
  {
    "type": "get",
    "url": "/getnotices/:societyId",
    "title": "Get notices of a society",
    "version": "1.0.0",
    "name": "getNotices",
    "group": "Notice",
    "permission": [
      {
        "name": "Admin, Resident"
      }
    ],
    "description": "<p>Get all the notices of a particular society</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": "<p>(Required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Notice Subject</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Notice Content</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "dateCreated",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response",
          "content": "     {\n  \"error\": false,\n  \"data\": [\n    {\n      \"subject\": \"Wow\",\n      \"content\": \"Hiij kjefds kjdfkjas joeiwjvoew ejfojeow\",\n      \"dateCreated\": \"2016-07-14T06:36:43.088Z\"\n    },\n    {\n      \"subject\": \"jksdksjw\",\n      \"content\": \"kjdshkjsdhksjdlsdla\",\n      \"dateCreated\": \"2016-07-14T06:37:02.238Z\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Notice"
  },
  {
    "type": "post",
    "url": "/addOpinionPoll",
    "title": "Add Opinion Poll",
    "version": "1.0.0",
    "name": "addOpinionPoll",
    "group": "Poll",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pollCloseDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(String)",
            "optional": false,
            "field": "options",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": "<p>AdminId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Requestt Example",
          "content": "{\n    \"question\": \"What is real name?\",\n    \"options\": [\n    \"yuifdjhfdkhdj\",\n    \"hhhhhhhhhhh\",\n    \"aaaaaaaaaa\",\n    \"jjjjjjjjjjjj\",\n    \"yyyyyyyyyyyy\"\n    ],\n    \"societyId\": \"5785d1c521e3f068239e1d5d\",\n    \"addedBy\": \"578529cea3b34e8c17dce78d\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pollId",
            "description": "<p>Newly created poll Id</p>"
          }
        ]
      }
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Poll"
  },
  {
    "type": "put",
    "url": "/editOpinionPoll/:pollId",
    "title": "Edit opinion poll",
    "version": "1.0.0",
    "name": "editOpinionPoll",
    "group": "Poll",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pollId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array(String)",
            "optional": false,
            "field": "options",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\"question\": \"Hi.......What is your real name?\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "pollCreatedDate",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "pollCloseDate",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(String)",
            "optional": false,
            "field": "options",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(Objects)",
            "optional": false,
            "field": "responses",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "responses.optionSelected",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "responses.responseTime",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "responses.responsedBy",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": "<p>Resident Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "      {\n  \"error\": false,\n  \"data\": {\n    \"_id\": \"578c9f9909609464132b3acb\",\n    \"question\": \"Hi.......What is your real name?\",\n    \"societyId\": \"5785d1c521e3f068239e1d5d\",\n    \"addedBy\": \"578529cea3b34e8c17dce78d\",\n    \"responses\": [\n      {\n        \"responsedBy\": \"57889a00e0a8c7bc1ebdb60c\",\n        \"optionSelected\": 3,\n        \"_id\": \"578c9fa509609464132b3acc\",\n        \"responseTime\": \"2016-07-18T09:21:41.334Z\"\n      },\n      {\n        \"responsedBy\": \"57889a00e0a8c7bc1ebdb60d\",\n        \"optionSelected\": 3,\n        \"_id\": \"578cb4e480276c0c103cee89\",\n        \"responseTime\": \"2016-07-18T10:52:20.282Z\"\n      }\n    ],\n    \"options\": [\n      \"yuifdjhfdkhdj\",\n      \"hhhhhhhhhhh\",\n      \"aaaaaaaaaa\",\n      \"jjjjjjjjjjjj\",\n      \"yyyyyyyyyyyy\"\n    ],\n    \"pollCreatedDate\": \"2016-07-18T09:21:29.088Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Poll"
  },
  {
    "type": "get",
    "url": "/getOpinionPollResponses/:pollId",
    "title": "Get responses for a poll",
    "version": "1.0.0",
    "name": "getOpinionPollResponses",
    "group": "Poll",
    "permission": [
      {
        "name": "Admin, Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pollId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "pollCreatedDate",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "pollCloseDate",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(String)",
            "optional": false,
            "field": "options",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(Objects)",
            "optional": false,
            "field": "responses",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "responses.optionSelected",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "responses.responseTime",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "responses.responsedBy",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": "<p>Resident Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "      {\n  \"error\": false,\n  \"data\": {\n    \"_id\": \"578c9f9909609464132b3acb\",\n    \"question\": \"Hi.......What is real name?\",\n    \"societyId\": \"5785d1c521e3f068239e1d5d\",\n    \"addedBy\": \"578529cea3b34e8c17dce78d\",\n    \"responses\": [\n      {\n        \"responsedBy\": \"57889a00e0a8c7bc1ebdb60c\",\n        \"optionSelected\": 3,\n        \"_id\": \"578c9fa509609464132b3acc\",\n        \"responseTime\": \"2016-07-18T09:21:41.334Z\"\n      },\n      {\n        \"responsedBy\": \"57889a00e0a8c7bc1ebdb60d\",\n        \"optionSelected\": 3,\n        \"_id\": \"578cb4e480276c0c103cee89\",\n        \"responseTime\": \"2016-07-18T10:52:20.282Z\"\n      }\n    ],\n    \"options\": [\n      \"yuifdjhfdkhdj\",\n      \"hhhhhhhhhhh\",\n      \"aaaaaaaaaa\",\n      \"jjjjjjjjjjjj\",\n      \"yyyyyyyyyyyy\"\n    ],\n    \"pollCreatedDate\": \"2016-07-18T09:21:29.088Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Poll"
  },
  {
    "type": "get",
    "url": "/getOpinionPolls",
    "title": "Get all opinion polls",
    "version": "1.0.0",
    "name": "getOpinionPolls",
    "group": "Poll",
    "permission": [
      {
        "name": "Admin, Resident"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array(Object)",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.question",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.pollCreatedDate",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.pollCloseDate",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(String)",
            "optional": false,
            "field": "data.options",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array(Objects)",
            "optional": false,
            "field": "data.responses",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.responses.optionSelected",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.responses.responseTime",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.responses.responsedBy",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.societyId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.addedBy",
            "description": "<p>Resident Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "      {\n  \"error\": false,\n  \"data\": [\n    {\n      \"_id\": \"578c9f9909609464132b3acb\",\n      \"question\": \"Hi.......What is real name?\",\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"addedBy\": \"578529cea3b34e8c17dce78d\",\n      \"__v\": 0,\n      \"responses\": [\n        {\n          \"responsedBy\": \"57889a00e0a8c7bc1ebdb60c\",\n          \"optionSelected\": 3,\n          \"_id\": \"578c9fa509609464132b3acc\",\n          \"responseTime\": \"2016-07-18T09:21:41.334Z\"\n        },\n        {\n          \"responsedBy\": \"57889a00e0a8c7bc1ebdb60d\",\n          \"optionSelected\": 3,\n          \"_id\": \"578cb4e480276c0c103cee89\",\n          \"responseTime\": \"2016-07-18T10:52:20.282Z\"\n        }\n      ],\n      \"options\": [\n        \"yuifdjhfdkhdj\",\n        \"hhhhhhhhhhh\",\n        \"aaaaaaaaaa\",\n        \"jjjjjjjjjjjj\",\n        \"yyyyyyyyyyyy\"\n      ],\n      \"pollCreatedDate\": \"2016-07-18T09:21:29.088Z\"\n    },\n    {\n      \"_id\": \"578cb54d80276c0c103cee8a\",\n      \"question\": \"What is real name?\",\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"addedBy\": \"578529cea3b34e8c17dce78d\",\n      \"__v\": 0,\n      \"responses\": [\n        {\n          \"responsedBy\": \"57889a00e0a8c7bc1ebdb60c\",\n          \"optionSelected\": 3,\n          \"_id\": \"578cb55480276c0c103cee8b\",\n          \"responseTime\": \"2016-07-18T10:54:12.808Z\"\n        }\n      ],\n      \"options\": [\n        \"yuifdjhfdkhdj\",\n        \"hhhhhhhhhhh\",\n        \"aaaaaaaaaa\",\n        \"jjjjjjjjjjjj\",\n        \"yyyyyyyyyyyy\"\n      ],\n      \"pollCreatedDate\": \"2016-07-18T10:54:05.895Z\"\n    },\n    {\n      \"_id\": \"578ccb773922b40819dd33da\",\n      \"question\": \"What is real name?\",\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"addedBy\": \"578529cea3b34e8c17dce78d\",\n      \"__v\": 0,\n      \"responses\": [],\n      \"options\": [\n        \"yuifdjhfdkhdj\",\n        \"hhhhhhhhhhh\",\n        \"aaaaaaaaaa\",\n        \"jjjjjjjjjjjj\",\n        \"yyyyyyyyyyyy\"\n      ],\n      \"pollCreatedDate\": \"2016-07-18T12:28:39.699Z\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Poll"
  },
  {
    "type": "put",
    "url": "/respondToOpinionPoll/:pollId",
    "title": "Respond to a poll",
    "version": "1.0.0",
    "name": "respondToOpinionPoll",
    "group": "Poll",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "description": "<p>Residents are allowed to submit a response for a poll only once</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pollId",
            "description": "<p>Through URl</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "optionSelected",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "responsedBy",
            "description": "<p>Resident Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "      {\n    \"optionSelected\": 3,\n    \"responsedBy\": \"57889a00e0a8c7bc1ebdb60c\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n  \"error\": true,\n  \"message\": \"Already Submitted the response\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Poll"
  },
  {
    "type": "post",
    "url": "/addResidentDoc",
    "title": "Add a new Resident document",
    "version": "1.0.0",
    "name": "addResidentDoc",
    "group": "Resident_document",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "docType",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userDocKey",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userDocURL",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "societyId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addedBy",
            "description": "<p>Resident Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "  {\n\"docType\": \"kkkkkkkk\",\n\"note\": \"jfkdhjkdfhkdjfs\",\n\"societyId\": \"5785d1c521e3f068239e1d5d\",\n\"addedBy\": \"578877021787272424e854f0\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docId",
            "description": "<p>Newly created doc Id</p>"
          }
        ]
      }
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Resident_document"
  },
  {
    "type": "delete",
    "url": "/deleteResidentDoc/:docId",
    "title": "Delete resident Documents",
    "version": "1.0.0",
    "name": "deleteResidentDoc",
    "group": "Resident_document",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "docId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n  error: false,\n  message: \"Successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Resident_document"
  },
  {
    "type": "delete",
    "url": "/deleteClassifedAd/:adId",
    "title": "Delete resident ad",
    "version": "1.0.0",
    "name": "deleteResidentDoc",
    "group": "Resident_document",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n  error: false,\n  message: \"Successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Resident_document"
  },
  {
    "type": "get",
    "url": "/getResidentDocs/:societyId",
    "title": "Get resident Documents",
    "version": "1.0.0",
    "name": "getResidentDocs",
    "group": "Resident_document",
    "permission": [
      {
        "name": "Resident"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "      {\n  \"error\": false,\n  \"data\": [\n    {\n      \"_id\": \"578dc20a58ea9e6c2969a8db\",\n      \"docType\": \"Pan card\",\n      \"note\": \"jfkdhjkdfhkdjfs\",\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"addedBy\": \"578877021787272424e854f0\",\n      \"__v\": 0,\n      \"uploadDateTime\": \"2016-07-19T06:00:42.520Z\"\n    },\n    {\n      \"_id\": \"578dc52593c00ae80964c2d5\",\n      \"docType\": \"Pan card\",\n      \"note\": \"jfkdhjkdfhkdjfs\",\n      \"societyId\": \"5785d1c521e3f068239e1d5d\",\n      \"addedBy\": \"578877021787272424e854f0\",\n      \"__v\": 0,\n      \"uploadDateTime\": \"2016-07-19T06:13:57.595Z\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rest/api.js",
    "groupTitle": "Resident_document"
  }
] });
