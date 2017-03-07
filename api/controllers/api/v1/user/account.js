var User = require(ROOT_FOLDER + "/models/users");
var Product = require(ROOT_FOLDER + "/models/product_catelog");
var Cart = require(ROOT_FOLDER + "/models/cart");
var Order = require(ROOT_FOLDER + "/models/order");
var Address = require(ROOT_FOLDER + "/models/address");

exports.getDetails = function(req, res, next) {
    var where = {};
    if (req.user) where._id = req.user._id;
    else {
        var err = new Error("User Token Missing");
        next(err);
    }
    User.findOne(where)
        .populate("address")
        .populate("shipping")
        .populate("billing")
        .populate("image")
        .populate("logo")
        .populate("banner")
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response(result, "success", 200, "Your user information");
        });
}
exports.saveDetails = function(req, res, next) {
    var where = {};
    var wheres = {};
    if (req.user) wheres._id = req.user._id;
    else {
        var err = new Error("User Token Missing");
        next(err);
    }
    where.address = req.body.address._id;
    Address.update({
            "_id": req.body.address._id
        }, req.body.address, {})
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response(result, "success", 200, "YOUR INFORMATION SAVED SUCCESSFULLY!");
        })
}
exports.update = function(req, res, next) {
    var where = {};
    where["is_deleted"] = false;
    where["_id"] = req.user._id;
    User.update(where, req.body, function(err, result) {
        if (err) return next(err);
        return res._response(result, "success", 200, "Profile has been updated successfully!");
    });
}
exports.updatePassword = function(req, res, next) {
    var where = {};
    if (req.user) where._id = req.user._id;
    else {
        var err = new Error("User Token Missing");
        next(err);
    }
    User.findOne({
            _id: req.user._id,
            password: req.body.old_password
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (user == null)
                return res._response(user, "error", 200, "YOUR CURRENT PASSWORD WRONG!");
            User.update(where, req.body, {})
                .exec(function(err, result) {
                    if (err) return next(err);
                    return res._response(result, "success", 200, "YOUR INFORMATION SAVED SUCCESSFULLY!");
                })
        })
}
