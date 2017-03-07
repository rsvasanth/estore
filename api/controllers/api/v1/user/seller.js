var User = require(ROOT_FOLDER + "/models/users");
var Image = require(ROOT_FOLDER + "/models/image");
var Order = require(ROOT_FOLDER + "/models/order");
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;
var _s_mail = require(ROOT_FOLDER + "/services/mail");
exports.getSellers = function(req, res, next) {
    var where = {};
    where["roles"] = "seller";
    where["is_deleted"] = false;
    where["status"] = true;
    User
        .aggregate()
        .match(where)
        .lookup({
            from: "addresses",
            foreignField: "_id",
            localField: "address",
            as: "address"
        })
        .lookup({
            from: "product_catelogs",
            foreignField: "created_by",
            localField: "_id",
            as: "products"
        })
        .project({
            "updated_at": 1,
            "created_at": 1,
            "name": 1,
            "email": 1,
            "address": 1,
            "total_products": {
                $size: {
                    $filter: {
                        input: "$products",
                        as: "product",
                        cond: {
                            $and: [{
                                $eq: ["$$product.status", true]
                            }, {
                                $eq: ["$$product.is_deleted", false]
                            }, {
                                $eq: ["$$product.is_active", true]
                            }]
                        }
                    }
                }
            },
            "images": 1,
            "logo": 1,
            "banner": 1
        })
        .exec(function(err, result) {
            if (err) return next(err);
            Image.populate(result, [{
                path: "logo"
            }, {
                path: "banner"
            }], function(err, result) {
                if (err) return next(err);
                return res._response(result);
            });
        });
}
exports.getTopProducts = function(req, res, next) {
    var where = {};
    Order
        .aggregate()
        .match({
            "payment.status": "Completed",
            "products.shop_id": ObjectId(req.params.id)
        })
        .unwind("products")
        .lookup({
          from: "product_catelogs",
          foreignField: "_id",
          localField: "products.id",
          as: "products_t"
        })
        .group({
            _id: "$products.id",
            sales_count: {
                $sum: 1
            },
            products: {
              $first: "$products_t"
            }
        })
        .project({
          products: {
            $arrayElemAt: ["$products", 0]
          },
          sales_count: 1
        })
        .match({
          "products.status": true,
          "products.is_active": true,
          "products.is_deleted": false
        })
        .lookup({
          from: "ratings",
          foreignField: "product",
          localField: "products._id",
          as: "products.ratings"
        })
        .sort({
            sales_count: -1
        })
        .project({
          products: 1,
          sales_count: 1,
          total_star: {
            $sum: "$products.ratings.stars"
          },
          total_ratings: {
            $size: "$products.ratings"
          },
          total_reviews: {
            $size: {
              $filter: {
                input: "$products.ratings",
                as: "rating",
                cond: {
                  $ne : ["$$rating.comment", ""]
                }
              }
            }
          }
        })
        .exec(function(err, result) {
            if (err) return next(err);
            Image.populate(result, [{
                path: "products.images"
            }], function(err, result) {
                if (err) return next(err);
                return res._response(result);
            });
        });
}
