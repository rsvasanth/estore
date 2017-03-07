var User = require(ROOT_FOLDER + "/models/users");
var _s_mail = require(ROOT_FOLDER + "/services/mail");
exports.query = function(req, res, next) {
    var where = {};
    where["is_deleted"] = false;
    User.find(where, function(err, result) {
        if (err) return next(err);
        return res._response({
            users: result
        });
    });
}
exports.fetch = function(req, res, next) {
    var where = {};
    where["is_deleted"] = false;
    where["_id"] = require("mongoose").Types.ObjectId(req.params.id);
    User.findOne(where)
        .populate("image", "url _id")
        .populate("banner", "url _id")
        .populate("logo", "url _id")
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response({
                user: result
            });
        });
}
exports.create = function(req, res, next) {
    new User(req.body).save(function(err, result) {
        if (err) return next(err);
        return res._response({
            user: result
        });
    });
}
exports.update = function(req, res, next) {
    var where = {};
    where["is_deleted"] = false;
    where["_id"] = req.params.id;
    User.update(where, req.body, function(err, result) {
        if (err) return next(err);
        if (req.body.status != undefined)
            _s_mail.sendStatusUpdateMail(req.params.id, req.body.status);
        return res._response(result);
    });
}
exports.changePassword = function(req, res, next) {
    var where = {};
    where["is_deleted"] = false;
    where["_id"] = req.user._id;
    User.findOne(where, function(err, user) {
        if (err) return next(err);
        else if(user == null) return next(Error("User not Found"));
        else if(!user.checkPassword(req.body.opassword)) return next(Error("Password is not valid"));
        else if(req.body.npassword != req.body.cpassword) return next(Error("Confirm password is not valid"));
        else {
          user.password = req.body.npassword;
          user.save(function(err, result) {
            if (err) return next(err);
            return res._response(result);
          })
        }
    });
}
exports.remove = function(req, res, next) {
    var where = {};
    where["_id"] = req.params.id;
    User.update(where, {
        "is_deleted": true
    }, function(err, result) {
        if (err) return next(err);
        return res._response(result);
    });
}
