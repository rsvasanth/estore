var User = require(ROOT_FOLDER + "/models/users");
var Product = require(ROOT_FOLDER + "/models/product_catelog");
var Cart = require(ROOT_FOLDER + "/models/cart");
var Image = require(ROOT_FOLDER + "/models/image");
var _h_product = require(ROOT_FOLDER + "/helpers/product");
var _h_cart = require(ROOT_FOLDER + "/helpers/cart");
var async = require("async");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

exports.addProductToCart = function(req, res, next) {
    var body = req.body;
    var query = req.query;
    var quantity = body.quantity ? body.quantity : 1;
    if (!req.user && !query.guest_token) {
        return next(new Error("User Id or Guest Token is missing"));
    }
    if (!body.product_id) {
        return next(new Error("Product Id is missing"));
    }

    async.series([
        _h_product.isProductAvailable(req, res, next),
        _h_cart.isProductAlreadyInCart(req, res, next),
        function(cb) {
            var product = {};
            if (req.user) {
                product["user_id"] = req.user._id;
            } else {
                product["guest_token"] = query.guest_token;
            }
            product["product_id"] = body.product_id;
            product["product_quantity"] = quantity;
            if (req.body.product_variant) {
                product["product_variant"] = req.body.product_variant;
            }
            new Cart(product)
                .save(function(err, result) {
                    if (err) return next(new Error("Product is not added in Cart"));
                    return cb(null, result);
                });
        }
    ], function(err, result) {
        if (err) return next(new Error("Error Occured while adding product in cart"));
        return res._response(result, "success", 200, "Product successfully added in cart");
    });
}
exports.removeProductFromCart = function(req, res, next) {
    var where = {};
    if (req.user) where["user_id"] = req.user._id;
    else if (req.query && req.query.guest_token != "") where.guest_token = req.query.guest_token;
    else {
        var err = new Error("Token or User Id Missing");
        return next(err);
    }
    if (!req.query.product_id && !req.query.cart_id) {
        var err = new Error("Product Missing");
        return next(err);
    }
    where["_id"] = req.query.cart_id;
    if (req.query.product_variant) {
        where["product_variant"] = req.query.product_variant;
    }
    Cart.remove(where)
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response(result, "success", 200, "Your cart product id removed");
        })
}
exports.getCount = function(req, res, next) {
    var where = {};
    if (req.user) where["user_id"] = req.user._id;
    else if (req.query && req.query.guest_token != "") where["guest_token"] = req.query.guest_token;
    else {
        var err = new Error("Token or User Id Missing");
        return next(err);
    }
    Cart.count(where)
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response({
                count: result
            });
        });
}
exports.getCartMobile = function(req, res, next) {
    var where = {};
    if (req.user) where["user_id"] = req.user._id;
    else if (req.query && req.query.guest_token != "") where["guest_token"] = req.query.guest_token;
    else {
        var err = new Error("Token or User Id Missing");
        return next(err);
    }
    Cart
        .aggregate()
        .match(where)
        .lookup({
            from: "product_catelogs",
            foreignField: "_id",
            localField: "product_id",
            as: "product"
        })
        .project({
          product: {
            $arrayElemAt: ["$product", 0]
          },
          product_quantity: 1,
          product_variant: 1,
          guest_token: 1,
          user_id: 1,
          product_id: 1,
        })
        .lookup({
            from: "ratings",
            foreignField: "product",
            localField: "product_id",
            as: "product.ratings"
        })
        .lookup({
            from: "users",
            foreignField: "_id",
            localField: "product.created_by",
            as: "seller"
        })
        .project({
          product_quantity: 1,
          product_variant: 1,
          guest_token: 1,
          user_id: 1,
          "product_id._id": "$product._id",
          "product_id.created_at": "$product._id",
          "product_id.updated_at": "$product._id",
          "product_id.meta": "$product._id",
          "product_id.images": "$product._id",
          "product_id.categories": "$product._id",
          "product_id.seller_name": {
              $arrayElemAt: ["$seller.name", 0]
          },
          "product_id.seller_id": {
              $arrayElemAt: ["$seller._id", 0]
          },
          "product_id.seller_email": {
              $arrayElemAt: ["$seller.email", 0]
          },
          "product_id.seller_phone": {
              $arrayElemAt: ["$seller.phone", 0]
          },
          "product_id.name": "$product.name",
          "product_id.ratings": "$product.ratings",
          "product_id.variants": "$product.variants",
          "product_id.quantity": "$product.quantity",
          "product_id.images": "$product.images",
          "product_id.pricing": "$product.pricing",
          "product_id.description": "$product.description",
          "product_id.sku": "$product.sku",
          "product_id.paid_by_buyer": "$product.paid_by_buyer",
          "product_id.shipping_details": "$product.shipping_details",
          "product_id.total_star": {
              $sum: "$product.ratings.stars"
          },
          "product_id.total_ratings": {
              $size: "$product.ratings"
          },
          "product_id.total_reviews": {
              $size: {
                  $filter: {
                      input: "$product.ratings",
                      as: "rating",
                      cond: {
                          $ne: ["$$rating.comment", ""]
                      }
                  }
              }
          }
        })
        .exec(function(err, result) {
            if (err) return next(err);
            Image.populate(result, {
                path: "product_id.images"
            }, function(err, result) {
                if (err) return next(err);
                return res._response({
                    product: result
                }, "success", 200, "Fetched Successfully");
            });
        });
}
exports.getCart = function(req, res, next) {
    var where = {};
    if (req.user) where["user_id"] = req.user._id;
    else if (req.query && req.query.guest_token != "") where["guest_token"] = req.query.guest_token;
    else {
        var err = new Error("Token or User Id Missing");
        return next(err);
    }
    console.log(where)
    Cart.find(where)
        .populate({
            path: "product_id",
            populate: [{
                path: "images",
                select: "url cdn -_id"
            }, {
                path: "created_by",
                select: "-password"
            }, {
                path: "ratings"
            }]
        })
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response(result);
        })
}
exports.updateProductToCart = function(req, res, next) {
    var product = {};
    var where = {};
    var body = req.body;
    var query = req.query;
    var quantity = (body.quantity && body.quantity >= 0) ? body.quantity : 1;
    if (!req.user && !query.guest_token) {
        return next(new Error("User Id or Guest Token is missing"));
    }
    if (!body.product_id) {
        return next(new Error("Product Id is missing"));
    }
    if (req.body.product_variant) {
        where["product_variant"] = req.body.product_variant;
    }
    where["product_id"] = req.body.product_id;
    if (!req.user)
        where.guest_token = query.guest_token;
    else
        where.user_id = req.user._id;
    async.series([
        _h_product.isProductAvailable(req, res, next)
    ], function(err, result) {
        if (err) return next(err);
        Cart.update(where, {
                product_quantity: quantity
            })
            .exec(function(err, result) {
                if (err) return next(err);
                return res._response(result, "success", 200, "Product updated successfully in cart");
            })
    });

}
exports.decrementQuantity = function(req, res, next) {
    var where = {};
    var product = {};
    if (req.user) where.user_id = req.user._id;
    else if (req.query && req.query.guest_token != "") where.guest_token = req.query.guest_token;
    else {
        var err = new Error("Token or User Id Missing");
        return next(err);
    }
    if (!req.body.product_id) {
        var err = new Error("Product Missing");
        return next(err);
    }
    where["product_id"] = req.body.product_id;
    product.product_id = req.body.product_id;
    product["$inc"] = {
        product_quantity: -req.params.qty
    };
    Cart.update(where, product, {})
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response(result, "success", 200, "Product add to cart");
        })
}
exports.incrementQuantity = function(req, res, next) {
    var where = {};
    var product = {};
    if (req.user) where.user_id = req.user._id;

    else if (req.query && req.query.guest_token != "") where.guest_token = req.query.guest_token;
    else {
        var err = new Error("Token or User Id Missing");
        return next(err);
    }
    if (!req.body.product_id) {
        var err = new Error("Product Missing");
        return next(err);
    }
    where.product_id = req.body.product_id;
    product["$inc"] = {
        product_quantity: req.params.qty
    };
    Cart.update(where, product, {})
        .exec(function(err, result) {
            if (err) return next(err);
            return res._response(result, "success", 200, "Added one more quantity to the product");
        })
}
