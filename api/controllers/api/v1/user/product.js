var User = require(ROOT_FOLDER + "/models/users");
var Product = require(ROOT_FOLDER + "/models/product_catelog");
var Rating = require(ROOT_FOLDER + "/models/rating");
var Image = require(ROOT_FOLDER + "/models/image");
var Order = require(ROOT_FOLDER + "/models/order");
var Category = require(ROOT_FOLDER + "/models/category");
var Return = require(ROOT_FOLDER + "/models/return_products");
var Mongoose = require('mongoose');
var async = require('async');
var _s_mail = require(ROOT_FOLDER + "/services/mail");
var ObjectId = Mongoose.Types.ObjectId;
var product_project = {
    _id: 1,
    created_at: 1,
    updated_at: 1,
    meta: 1,
    images: 1,
    categories: 1,
    seller_name: {
        $arrayElemAt: ["$seller.name", 0]
    },
    seller_id: {
        $arrayElemAt: ["$seller._id", 0]
    },
    seller_email: {
        $arrayElemAt: ["$seller.email", 0]
    },
    seller_phone: {
        $arrayElemAt: ["$seller.phone", 0]
    },
    name: 1,
    ratings: 1,
    variants: 1,
    quantity: 1,
    pricing: 1,
    description: 1,
    long_description: 1,
    sku: 1,
    paid_by_buyer: 1,
    shipping_details: 1,
    discount: {
        $multiply: [{
            $divide: [{
                $subtract: [
                    "$pricing.original", "$pricing.after_discount"
                ]
            }, "$pricing.original"]
        }, 100]
    },
    total_star: {
        $sum: "$ratings.stars"
    },
    average_star: {
        $cond: {
            if: {
                $size: "$ratings"
            },
            then: {
                $divide: [{
                    $sum: "$ratings.stars"
                }, {
                    $size: "$ratings"
                }]
            },
            else: 0
        }
    },
    total_ratings: {
        $size: "$ratings"
    },
    total_reviews: {
        $size: {
            $filter: {
                input: "$ratings",
                as: "rating",
                cond: {
                    $ne: ["$$rating.comment", ""]
                }
            }
        }
    }
};
exports.getBestSellers = function(req, res, next) {
    var productIds = [];
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var skip = req.query.start ? parseInt(req.query.start) * limit : 0;
    var where = {};
    where["products.is_deleted"] = false;
    where["products.is_active"] = true;
    where["products.status"] = true;
    // where["seller.roles"] = "seller";
    // where["seller.is_deleted"] = false;
    // where["seller.status"] = true;
    async.series({
        ids: function(cb) {
            Order
                .aggregate()
                .unwind("products")
                .lookup({
                    from: "product_catelogs",
                    foreignField: "_id",
                    localField: "products.id",
                    as: "products"
                })
                // .lookup({
                //     from: "users",
                //     foreignField: "_id",
                //     localField: "products.created_by",
                //     as: "seller"
                // })
                .match(where)
                .group({
                    "_id": "$products._id",
                    "total_order": {
                        $sum: 1
                    }
                })
                .sort({
                    total_order: -1
                })
                .group({
                    "_id": null,
                    "ids": {
                        $push: {
                            $arrayElemAt: ["$_id", 0]
                        }
                    }
                })
                .limit(limit)
                .skip(skip)
                .exec(function(err, result) {
                    productIds = result;
                    cb(err, result);
                });
        },
        product: function(cb) {
            productIds = productIds.length ? productIds[0].ids : [];
            var tem_project = Object.assign({}, product_project);
            delete tem_project.long_description;
            Product
                .aggregate()
                .match({
                    _id: {
                        $in: productIds
                    }
                })
                .skip(skip)
                .limit(limit)
                .lookup({
                    from: "ratings",
                    foreignField: "product",
                    localField: "_id",
                    as: "ratings"
                })
                .lookup({
                    from: "users",
                    foreignField: "_id",
                    localField: "created_by",
                    as: "seller"
                })
                .project(tem_project)
                .sort({
                    "discount": -1
                })
                .exec(cb)
        }
    }, function(err, result) {
        Image.populate(result, {
            path: "product.images"
        }, function(err, result) {
            if (err) return next(err);
            return res._response(result, "success", 200, "Fetched Successfully");
        });
    });
}
exports.getBestOffers = function(req, res, next) {
    var where = {};
    var s_where = {};
    s_where["seller.roles"] = "seller";
    s_where["seller.is_deleted"] = false;
    s_where["seller.status"] = true;
    var sort = {};
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var skip = req.query.start ? parseInt(req.query.start) * limit : 0;
    where["is_deleted"] = false;
    where["is_active"] = true;
    where["status"] = true;
    if (req.query.sort) {
        sort[req.query.sort] = req.query.sort_type ? req.query.sort_type : -1;
    } else {
        sort["created_at"] = -1;
    }
    if (req.query.name) {
        where["title"] = {
            $regex: req.query.name,
            $options: 'i'
        };
    }
    if (req.query.category) {
        where["categories"] = ObjectId(req.query.category);
    }
    if (req.query.lprice && req.query.hprice) {
        where["pricing.after_discount"] = {
            $gte: req.query.lprice,
            $lte: req.query.hprice
        };
    }
    var tem_project = Object.assign({}, product_project);
    delete tem_project.long_description;
    Product
        .aggregate()
        .match(where)
        .skip(skip)
        .limit(limit)
        .lookup({
            from: "ratings",
            foreignField: "product",
            localField: "_id",
            as: "ratings"
        })
        .lookup({
            from: "users",
            foreignField: "_id",
            localField: "created_by",
            as: "seller"
        })
        .match(s_where)
        .project(tem_project)
        .sort({
            "discount": -1
        })
        .exec(function(err, result) {
            Image.populate(result, {
                path: "images"
            }, function(err, result) {
                if (err) return next(err);
                return res._response({
                    product: result
                }, "success", 200, "Fetched Successfully");
            });
        });
}
exports.getTopRated = function(req, res, next) {
    var where = {};
    var s_where = {};
    s_where["seller.roles"] = "seller";
    s_where["seller.is_deleted"] = false;
    s_where["seller.status"] = true;
    var sort = {};
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var skip = req.query.start ? parseInt(req.query.start) * limit : 0;
    where["is_deleted"] = false;
    where["is_active"] = true;
    where["status"] = true;
    if (req.query.sort) {
        sort[req.query.sort] = req.query.sort_type ? req.query.sort_type : -1;
    } else {
        sort["created_at"] = -1;
    }
    if (req.query.name) {
        where["title"] = {
            $regex: req.query.name,
            $options: 'i'
        };
    }
    if (req.query.category) {
        where["categories"] = ObjectId(req.query.category);
    }
    if (req.query.lprice && req.query.hprice) {
        where["pricing.after_discount"] = {
            $gte: req.query.lprice,
            $lte: req.query.hprice
        };
    }
    var tem_project = Object.assign({}, product_project);
    delete tem_project.long_description;
    Product
        .aggregate()
        .match(where)
        .skip(skip)
        .lookup({
            from: "ratings",
            foreignField: "product",
            localField: "_id",
            as: "ratings"
        })
        .lookup({
            from: "users",
            foreignField: "_id",
            localField: "created_by",
            as: "seller"
        })
        .match(s_where)
        .project(tem_project)
        .sort({
            "average_star": -1
        })
        .limit(limit)
        .exec(function(err, result) {
            Image.populate(result, {
                path: "images"
            }, function(err, result) {
                if (err) return next(err);
                return res._response({
                    product: result
                }, "success", 200, "Fetched Successfully");
            });
        });
}
exports.getPopularProducts = function(req, res, next) {
    var where = {};
    var s_where = {};
    s_where["seller.roles"] = "seller";
    s_where["seller.is_deleted"] = false;
    s_where["seller.status"] = true;
    var sort = {};
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var skip = req.query.start ? parseInt(req.query.start) * limit : 0;
    where["is_deleted"] = false;
    where["is_active"] = true;
    where["status"] = true;
    if (req.query.sort) {
        sort[req.query.sort] = req.query.sort_type ? req.query.sort_type : -1;
    } else {
        sort["created_at"] = -1;
    }
    if (req.query.name) {
        where["title"] = {
            $regex: req.query.name,
            $options: 'i'
        };
    }
    if (req.query.category) {
        where["categories"] = ObjectId(req.query.category);
    }
    if (req.query.lprice && req.query.hprice) {
        where["pricing.after_discount"] = {
            $gte: req.query.lprice,
            $lte: req.query.hprice
        };
    }
    var tem_project = Object.assign({}, product_project);
    delete tem_project.long_description;
    Product
        .aggregate()
        .match(where)
        .skip(skip)
        .lookup({
            from: "ratings",
            foreignField: "product",
            localField: "_id",
            as: "ratings"
        })
        .lookup({
            from: "users",
            foreignField: "_id",
            localField: "created_by",
            as: "seller"
        })
        .match(s_where)
        .project(tem_project)
        .sort({
            "total_reviews": -1
        })
        .limit(limit)
        .exec(function(err, result) {
            Image.populate(result, {
                path: "images"
            }, function(err, result) {
                if (err) return next(err);
                return res._response({
                    product: result
                }, "success", 200, "Fetched Successfully");
            });
        });
}
exports.getProducts = function(req, res, next) {
    var where = {};
    var s_where = {};
    s_where["seller.roles"] = "seller";
    s_where["seller.is_deleted"] = false;
    s_where["seller.status"] = true;
    var sort = {};
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var skip = req.query.start ? parseInt(req.query.start) * limit : 0;
    where["is_deleted"] = false;
    where["is_active"] = true;
    where["status"] = true;
    if (req.query.sort) {
        sort[req.query.sort] = req.query.sort_type ? req.query.sort_type : -1;
    } else {
        sort["created_at"] = -1;
    }
    if (req.query.name) {
        where["title"] = {
            $regex: req.query.name,
            $options: 'i'
        };
    }
    if (req.query.category) {
        where["categories"] = ObjectId(req.query.category);
    }
    if (req.query.lprice && req.query.hprice) {
        where["pricing.after_discount"] = {
            $gte: parseInt(req.query.lprice),
            $lte: parseInt(req.query.hprice)
        };
    }
    var tem_project = Object.assign({}, product_project);
    delete tem_project.long_description;
    async.parallel({
        product: function(cb) {
            Product
                .aggregate()
                .match(where)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lookup({
                    from: "ratings",
                    foreignField: "product",
                    localField: "_id",
                    as: "ratings"
                })
                .lookup({
                    from: "users",
                    foreignField: "_id",
                    localField: "created_by",
                    as: "seller"
                })
                .match(s_where)
                .project(tem_project)
                .exec(cb);
        },
        category: function(cb) {
            Category.findOne({
                    _id: ObjectId(req.query.category)
                })
                .populate("image")
                .populate("parent_id")
                .exec(cb);
        }
    }, function(err, result) {
        Image.populate(result, {
            path: "product.images"
        }, function(err, result) {
            if (err) return next(err);
            return res._response(result, "success", 200, "Fetched Successfully");
        });
    })
}
exports.getSingleProduct = function(req, res, next) {
    var where = {};
    where["_id"] = ObjectId(req.params.id);
    Product
        .aggregate()
        .match(where)
        .lookup({
            from: "ratings",
            foreignField: "product",
            localField: "_id",
            as: "ratings"
        })
        .lookup({
            from: "users",
            foreignField: "_id",
            localField: "created_by",
            as: "seller"
        })
        .project({
            _id: 1,
            created_at: 1,
            terms_and_conditions: 1,
            updated_at: 1,
            meta: 1,
            images: 1,
            categories: 1,
            seller_name: {
                $arrayElemAt: ["$seller.name", 0]
            },
            seller_id: {
                $arrayElemAt: ["$seller._id", 0]
            },
            seller_email: {
                $arrayElemAt: ["$seller.email", 0]
            },
            seller_phone: {
                $arrayElemAt: ["$seller.phone", 0]
            },
            name: 1,
            ratings: 1,
            variants: 1,
            quantity: 1,
            pricing: 1,
            description: 1,
            long_description: 1,
            sku: 1,
            paid_by_buyer: 1,
            shipping_details: 1,
            total_star: {
                $sum: "$ratings.stars"
            },
            total_ratings: {
                $size: "$ratings"
            },
            total_reviews: {
                $size: {
                    $filter: {
                        input: "$ratings",
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
                path: "images"
            }, function(err, result) {
                if (err) return next(err);
                Category.populate(result, {
                        path: "categories",
                        populate: {
                            path: "image"
                        }
                    },
                    function(err, result) {
                        if (err) return next(err);

                        return res._response({
                            product: result
                        }, "success", 200, "Fetched Successfully");
                    })
            });
        });
}
exports.getProductsBySeller = function(req, res, next) {
    var where = {};
    where["_id"] = ObjectId(req.params.id);
    where["roles"] = "seller";
    //where["verified"] = true;
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
            "products": {
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
                        }, {
                            $gt: ["$$product.quantity", 0]
                        }]
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
            }, {
                path: "products.images"
            }], function(err, result) {
                if (err) return next(err);
                return res._response(result);
            });
        });
}
exports.getSingleProductReview = function(req, res, next) {
    var where = {};
    where["product"] = new ObjectId(req.params.id);
    Rating.find(where)
        .populate({
            path: "user",
            populate: {
                path: "logo"
            }
        })
        .exec(function(err, result) {
            if (!err) return res._response({
                rating: result
            }, "success", 200, "Fetched Successfully");
            return next(err);
        });
}
exports.getSingleProductReturn = function(req, res, next) {
    var where = {};
    where["_id"] = new ObjectId(req.params.oid);
    where["products.id"] = new ObjectId(req.params.id);
    Order
        .aggregate()
        .unwind('products')
        .match(where)
        .lookup({
            from: "product_catelogs",
            localField: "products.id",
            foreignField: "_id",
            as: "product"
        })
        .lookup({
            from: "users",
            localField: "products.shop_id",
            foreignField: "_id",
            as: "seller"
        })
        .exec(function(err, result) {
            if (err) return next(err);
            Image.populate(result, {
                path: "product.images"
            }, function(err, result) {
                if (err) return next(err);
                res._response({
                    product: result
                }, "success", 200, "Fetched Successfully");
            });
        });
}
exports.checkReviewProduct = function(req, res, next) {
    var where = {};
    where.product = req.params.id;
    where.user = req.user._id;
    Order.findOne({
            "_id": req.params.oid
        })
        .exec(function(err, order) {
            if (err) return next(err);
            if (order != null) {
                Rating.findOne(where)
                    .exec(function(err, result) {
                        if (err) return next(err);
                        if (result != null)
                            res._response('', "false", 200, "");
                        else
                            res._response('', "ture", 200, "");
                    });
            }
        });
}
exports.saveReview = function(req, res, next) {
    req.body.product = req.params.id;
    req.body.user = req.user._id;
    var prod = {};
    prod.ratings = [];
    new Rating(req.body)
        .save(function(err, result) {
            if (err) return next(err);
            prod.ratings.push(result._id);
            Product.update({
                "_id": req.params.id
            }, prod, {}, function(err, resu) {
                res._response(result, "success", 200, "Your review successfully added");
            });
        });
}
exports.saveReturn = function(req, res, next) {
    var where = {};
    where.product = req.params.id;
    where.user = req.user._id;
    where.order = req.params.oid;
    req.body.product = req.params.id;
    req.body.user = req.user._id;
    req.body.order = req.params.oid;

    Return.findOne(where)
        .exec(function(err, resu) {
            if (err) return next(err);
            if (resu == null) {
                new Return(req.body)
                    .save(function(err, result) {
                        if (err) return next(err);
                        Order.update({
                            "_id": req.params.oid,
                            "products.id": req.params.id,
                            "user_id": req.user._id
                        }, {
                            "products.$.status": "Approved",
                            "products.$.tracking.status": "Returned",
                            "products.$.tracking.reason": req.body.reason
                        }, function(err, result1) {
                            if (err) return next(err);
                            _s_mail.sendProductStatusNotification(req.user._id, req.params.id, "Returned");
                            return res._response(result, "success", 200, "Please wait admin will contact you");
                        });
                    });
            } else
                return res._response('', "error", 304, "Already this product returned");
        });

}
