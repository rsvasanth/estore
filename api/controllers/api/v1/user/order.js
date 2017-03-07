var User = require(ROOT_FOLDER + "/models/users");
var Product = require(ROOT_FOLDER + "/models/product_catelog");
var Cart = require(ROOT_FOLDER + "/models/cart");
var Order = require(ROOT_FOLDER + "/models/order");
var Address = require(ROOT_FOLDER + "/models/address");

exports.getOrder = function(req, res, next) {
    var where = {};
    if (req.user) where.user_id = req.user._id;
    else {
        var err = new Error("User Token Missing");
        next(err);
    }
    Order.find(where)
        .sort({
          created_at: -1
        })
        .populate("products.id", "-long_description")
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response(result);
        })
}
