var Cart = require(ROOT_FOLDER + "/models/cart");
var _self = exports;
exports.getCartProduct = function(where, cb) {
    Cart.findOne(where, cb);
}
exports.isProductAlreadyInCart = function(req, res, next) {
    var body = req.body;
    var query = req.query;
    return function(cb) {
        var _c_whr = {};
        if (req.user) {
            _c_whr["user_id"] = req.user._id;
        } else {
            _c_whr["guest_token"] = query.guest_token;
        }
        _c_whr["product_id"] = body.product_id;
        if (req.body.product_variant) {
            _c_whr["product_variant"] = req.body.product_variant;
        }
        _self.getCartProduct(_c_whr, function(err, result) {
            if (err) return next(err);
            else if (result) return next(new Error("Product is already added in Cart"));
            cb(null, result);
        });
    };
}
