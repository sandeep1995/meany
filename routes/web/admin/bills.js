var User = require('../../../models/user');

var ObjectId = require('mongodb').ObjectId;

module.exports = {


    get: function(req, res, next) {
        res.render('admin/bills', {
            title: 'Bills'
        });
    },

    post: function(req, res, next) {
        console.log(req.body);
        console.log(new ObjectId("5799ae6eb3b21ea20ff4eaf5"));
        var data = req.body;
        data.societyId = new ObjectId("5799ae6eb3b21ea20ff4eaf5");
        var notice = new Notice(data);
        notice.save(function(err) {
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

    put: function(req, res, next) {
        res.render('admin/notices', {
            title: 'Notices'
        });
    }


}
