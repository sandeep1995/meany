var User = require('../../../models/user');

module.exports = {
	get: function (req, res) {
  		res.render('resident/search');
	},
	post: function (req, res){
  var query = {};
  switch(req.body.searchType) {
    case "name":
        query = {
          "name" : new RegExp(req.body.search, "i" )
        };
        break;
    case "contactPhone":
        query = {
          "contactPhone" : new RegExp(req.body.search, "i")
        };
        break;
    case "profession":
      query = {
        "profession": req.body.search
      };
      break;
    case "carNumber":
      query = {
        "carNumber1" : req.body.search
      };
      break;
    case "house":
      query = {
        "flatNo": req.body.search.split(',')[0],
        "block": req.body.search.split(',')[1]
      };
      break;
    default:
      query = {}
  }


  User.find( query, function (err, results) {
    if (err) {
         console.log(err);
         return res.json({
          error: true,
          message: "Internal error occured"
         })
       } else {
        console.log(results);
        var profiles = [];
        for (var user in results) {
          if(user)
            if (!results[user].isProfilePrivate){
                results[user].password = undefined;
                profiles.push(results[user]);
            }
        }
        res.json({
          error: false,
          data: profiles
        });
       }
  });
	}
};
