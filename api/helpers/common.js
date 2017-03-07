var User = require(ROOT_FOLDER + "/models/users");
var Product = require(ROOT_FOLDER + "/models/product_catelog");
exports.randomString = function(length) {
    length = length == "undefined" ? length : 6;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
exports.getProductData = function(id, cb) {
    Product
        .findOne({
            _id: id
        })
        .populate("created_by")
        .exec(cb);
}
exports.getUserById = function(id, cb) {
    User.findOne({
        _id: id
    }, cb);
}
