var mandrill = require('node-mandrill')('4fwc6sNgVF8aX8JbIN_Kfg');
var _h_common = require(ROOT_FOLDER + "/helpers/common");
var _h_product = require(ROOT_FOLDER + "/helpers/product");
var EmailTemplate = require(ROOT_FOLDER + "/models/email_template");
var Settings = require(ROOT_FOLDER + "/models/site_configuration");
var _self = exports;
var async = require("async");
var base_url = "http://the-symbol.net";
var hbs = require("express-hbs");
var site_title = "The Symbol";
hbs.registerHelper('getShippingTotal', function(orders) {
    var shippingTotal = 0;
    for (var order in orders) {
        for (var product in orders[order].products) {
            shippingTotal += parseInt(orders[order].products[product].ship_amount);
        }
    }
    return new hbs.SafeString(shippingTotal);
});
hbs.registerHelper('getSubTotal', function(orders) {
    var subTotal = 0;
    for (var order in orders) {
        for (var product in orders[order].products) {
            subTotal += parseInt(orders[order].products[product].amount);
        }
    }
    return new hbs.SafeString(subTotal);
});
hbs.registerHelper('orderTotal', function(orders) {
    var total = 0;
    for (var order in orders) {
        total += parseInt(orders[order].total_price);
    }
    return new hbs.SafeString(total);
});
hbs.registerHelper('multiply', function(qty, price) {
    return new hbs.SafeString(qty * price);
});
exports.parseTemplate = function(template, data) {
    var compiledData = hbs.compile(template);
    return compiledData(data);
}
exports.sendMail = function(from, to, sub, html, text, name, cb) {
    mandrill('/messages/send', {
        message: {
            to: [{
                email: to,
                name: name
            }, {
                email: "vivek@provenlogic.net",
                name: "vivek"
            }],
            from_email: 'no-reply@gmail.com',
            subject: sub,
            html: html
        }
    }, cb);
};
exports.sendStatusUpdateMail = function(user, status, cb) {

    EmailTemplate.findOne({
        _id: '57cea2fbb77b1fb3387e5a99'
    }, function(err, result) {
        if (err) return cb(err);
        _h_common.getUserById(user, function(err, user) {
            var statusD = status == true ? "activated" : "deactivated";
            var template = _self.parseTemplate(result.content, {
                name: user.name,
                status: statusD
            });
            _self.sendMail("no-reply@test.com",
                user.email,
                result.subject,
                template,
                "text", cb
            );
        });
    });

};
exports.sendPayNotification = function(pay, cb) {
    EmailTemplate.findOne({
        _id: '57cea43eb77b1fb3387e5a9a'
    }, function(err, result) {
        if (err) return cb(err);
        _h_common.getUserById(pay.user, function(err, user) {
            var template = _self.parseTemplate(result.content, {
                name: user.name,
                email: user.email,
                type: pay.transaction_type,
                amount: pay.transferred_amount
            });
            _self.sendMail("no-reply@test.com",
                user.email,
                pay.transaction_type + " Notification",
                template,
                "text", cb
            );
        });
    });
};
exports.sendForgotPasswordLink = function(user, cb) {
    EmailTemplate.findOne({
        _id: '57ce915a66ff4e8668d4d863'
    }, function(err, result) {
        if (err) return cb(err);
        user.link = base_url + "/#/newpassword/" + user._id;
        var template = _self.parseTemplate(result.content, user);
        _self.sendMail("no-reply@test.com",
            user.email,
            result.subject,
            template,
            "text", cb
        )
    })
};
exports.sendRegistrationNotification = function(body, cb) {
    EmailTemplate.findOne({
        _id: '57ce739f57cebf341e41ce70'
    }, function(err, result) {
        if (err) return cb(err);
        var link = base_url + "/#/confirmation/" + body._id;
        var template = _self.parseTemplate(result.content, {
            name: body.name,
            email: body.email,
            link: link,
            site_title: site_title
        });
        _self.sendMail("no-reply@test.com",
            body.email,
            result.subject,
            template,
            "text", cb
        )
    })
}
exports.sendRegistrationNotificationToSeller = function(body, cb) {
    EmailTemplate.findOne({
        _id: '57ce739f57cebf341e41ce70'
    }, function(err, result) {
        if (err) return cb(err);
        var link = base_url + "/api/v1/sellers/confirm/" + body._id;
        var template = _self.parseTemplate(result.content, {
            name: body.name,
            email: body.email,
            link: link,
            site_title: site_title
        });
        _self.sendMail("no-reply@test.com",
            body.email,
            result.subject,
            template,
            "text", cb
        )
    })
}
exports.sendProductStatusNotification = function(user, product, status, cb) {
    var productData = {};
    var userData = {};
    async.series([
        function(s_call) {
            _h_common.getUserById(user, function(err, user) {
                userData = user;
                s_call(null, null);
            });
        },
        function(s_call) {
            _h_common.getProductData(product, function(err, product) {
                productData = product;
                s_call(null, null);
            });
        },
        function(s_call) {
            EmailTemplate.findOne({
                _id: '57d930853a2ebc4d38c09551'
            }, function(err, result) {
                var template = _self.parseTemplate(result.content, {
                    name: productData.created_by.name,
                    email: productData.created_by.email,
                    product_name: productData.name,
                    user_name: userData.name,
                    status: status
                });
                _self.sendMail("no-reply@test.com",
                    productData.created_by.email,
                    result.subject,
                    template,
                    "text",
                    function() {}
                );
                s_call(null, null);
            })
        },
        function(s_call) {
            EmailTemplate.findOne({
                _id: '57d92ff93a2ebc4d38c09550'
            }, function(err, result) {
                var template = _self.parseTemplate(result.content, {
                    name: productData.created_by.name,
                    email: productData.created_by.email,
                    product_name: productData.name,
                    name: userData.name,
                    status: status
                });
                _self.sendMail("no-reply@test.com",
                    userData.email,
                    result.subject,
                    template,
                    "text",
                    function() {}
                );
                s_call(null, null);
            })
        }
    ], cb);
}
exports.sendProductStatusMail = function(id, status, cb) {
    EmailTemplate.findOne({
        _id: '57cea705365771df4c4041f8'
    }, function(err, result) {
        if (err) return cb(err);
        _h_common.getProductData(id, function(err, product) {
            var statusD = status == "true" ? "activated" : "deactivated";
            var template = _self.parseTemplate(result.content, {
                name: product.created_by.name,
                email: product.created_by.email,
                product_name: product.name,
                status: statusD
            });
            _self.sendMail("no-reply@test.com",
                product.created_by.email,
                result.subject,
                template,
                "text", cb
            );
        })
    })
}
exports.sendOrderPlacedNotification1 = function(order_id, cb) {
    var settings = {};
    _h_product.getOrder(order_id)(function(err, orders) {
        async.series([
            function(parCal) {
                Settings.findOne({}, function(err, result) {
                    settings = result;
                    parCal();
                })
            },
            function(parCal) {
                async.each(orders, function(item, callback) {
                    var template = _self.parseTemplate(sellerOrderTemplate(), item);
                    _self.sendMail("no-reply@test.com",
                        item.seller.email,
                        "User has purchased your product",
                        template,
                        "text"
                    );
                    callback();
                }, parCal);
            },
            function(parCal) {
                var template = adminOrderTemplate(orders);
                _self.sendMail("no-reply@test.com",
                    settings.contact.email,
                    "User made a order",
                    template,
                    "text"
                );
                parCal();
            },
            function(parCal) {
                var template = adminOrderTemplate(orders);
                _self.sendMail("no-reply@test.com",
                    orders[0].user.email,
                    "You have made a order",
                    template,
                    "text"
                );
                parCal();
            }
        ], cb);
    });
}
exports.forgotPasswordMail = function(id, password, cb) {
    EmailTemplate.findOne({
        _id: '57d016ad883f2a701aa8817d'
    }, function(err, result) {
        if (err) return cb(err);
        _h_common.getUserById(id, function(err, user) {
            var template = _self.parseTemplate(result.content, {
                name: user.name,
                password: password
            });
            _self.sendMail("no-reply@test.com",
                user.email,
                result.subject,
                template,
                "text", cb
            );
        });
    });
}
exports.sendResetPasswordMail = function(id, cb) {
    EmailTemplate.findOne({
        _id: '57d01836883f2a701aa88180'
    }, function(err, result) {
        if (err) return cb(err);
        _h_common.getUserById(id, function(err, user) {
            var template = _self.parseTemplate(result.content, {
                name: user.name
            });
            _self.sendMail("no-reply@test.com",
                user.email,
                result.subject,
                template,
                "text", cb
            );
        });
    });
}
exports.sendVerificationSuccessMail = function(id, cb) {
    EmailTemplate.findOne({
        _id: '57d01286f495aa700e22714e'
    }, function(err, result) {
        if (err) return cb(err);
        _h_common.getUserById(id, function(err, user) {
            console.log(user);
            var template = _self.parseTemplate(result.content, {
                name: user.name
            });
            _self.sendMail("no-reply@test.com",
                user.email,
                result.subject,
                template,
                "text", cb
            );
        });
    });
}
var adminOrderTemplate = function(orders) {
    var html = "";
    var grand_total = 0;
    html += '<p>Hi Admin,</p>';
    html += '<p>' + orders[0].user.name + '  has purchased following items.</p>';
    html += '<p>&nbsp;</p>';
    html += '<table border="1" cellpadding="1" cellspacing="1" style="width:500px">';
    html += '<tbody>';
    html += '<tr>';
    html += '<td>Product Name</td>';
    html += '<td>Price</td>';
    html += '<td>Shipping Amount</td>';
    html += '<td>Quantity</td>';
    html += '<td>Total</td>';
    html += '</tr>';
    orders.forEach(function(item) {
        html += '<tr>';
        html += '<td colspan="3"><b>Seller Name</b></td>';
        html += '<td colspan="2">' + item.seller.name + '</td>';
        html += '</tr>';
        item.products.forEach(function(product) {
            html += '<tr>';
            html += '<td>' + product.name + '</td>';
            html += '<td>' + product.amount + '</td>';
            html += '<td>' + product.ship_amount + '</td>';
            html += '<td>' + product.qty + '</td>';
            html += '<td>' + product.total_amount + '</td>';
            html += '</tr>';
            grand_total += product.total_amount;
        })
    })
    html += '</tbody>';
    html += '</table>';
    html += '<p>&nbsp;</p>';
    html += '<p>Grand Total ' + grand_total + '</p>';
    return html;
}
var userOrderTemplate = function(orders) {
    var html = "";
    var grand_total = 0;
    html += '<p>Hi ' + orders[0].user.name + ',</p>';
    html += '<p>You have purchased following items.</p>';
    html += '<p>&nbsp;</p>';
    html += '<table border="1" cellpadding="1" cellspacing="1" style="width:500px">';
    html += '<tbody>';
    html += '<tr>';
    html += '<td>Product Name</td>';
    html += '<td>Price</td>';
    html += '<td>Shipping Amount</td>';
    html += '<td>Quantity</td>';
    html += '<td>Total</td>';
    html += '</tr>';
    orders.forEach(function(item) {
        html += '<tr>';
        html += '<td colspan="3"><b>Seller Name</b></td>';
        html += '<td colspan="2">' + item.seller.name + '</td>';
        html += '</tr>';
        item.products.forEach(function(product) {
            html += '<tr>';
            html += '<td>' + product.name + '</td>';
            html += '<td>' + product.amount + '</td>';
            html += '<td>' + product.ship_amount + '</td>';
            html += '<td>' + product.qty + '</td>';
            html += '<td>' + product.total_amount + '</td>';
            html += '</tr>';
            grand_total += product.total_amount;
        })
    })
    html += '</tbody>';
    html += '</table>';
    html += '<p>&nbsp;</p>';
    html += '<p>Grand Total ' + grand_total + '</p>';
    return html;
}
var sellerOrderTemplate = function() {
    var html = "";
    html += '<p>Hi {{seller.name}},</p>';
    html += '<p>User <strong>{{user.name}}</strong> has purchased following products</p>';
    html += '<table border="1" cellpadding="1" cellspacing="1" style="width:500px">';
    html += '<tbody>';
    html += '<tr>';
    html += '<td>Product Name</td>';
    html += '<td>Price</td>';
    html += '<td>Shipping Amount</td>';
    html += '<td>Quantity</td>';
    html += '<td>Total</td>';
    html += '</tr>';
    html += '{{#each products}}';
    html += '<tr>';
    html += '<td>{{name}}</td>';
    html += '<td>{{amount}}</td>';
    html += '<td>{{ship_amount}}</td>';
    html += '<td>{{qty}}</td>';
    html += '<td>{{total_amount}}</td>';
    html += '</tr>';
    html += '{{/each}}';
    html += '</tbody>';
    html += '</table>';
    html += '<p>&nbsp;</p>';
    html += '<p>Grand Total {{total_price}}</p>';
    return html;
}
exports.sendOrderPlacedNotification = function(order_id, cb) {
    cb = cb ? cb : function() {};
    fs = require('fs');
    var settings = {};
    _h_product.getOrder(order_id)(function(err, orders) {
        async.series([
            function(p_cal) {
                Settings.findOne({}, function(err, result) {
                    settings = result;
                    p_cal();
                })
            },
            function(p_cal) {
                async.each(orders, function(item, callback) {
                    fs.readFile(ROOT_FOLDER + "/views/email_templates/seller_invoice.html", 'utf8', function(err, result) {
                        var template = _self.parseTemplate(result, {
                            orders: [item],
                            base_url: base_url
                        });
                        _self.sendMail("no-reply@test.com",
                            item.seller.email,
                            "User has purchased your product",
                            template,
                            "text"
                        );
                        callback();
                    })
                }, function() {});
                p_cal(null, {});
            },
            function(p_cal) {
                fs.readFile(ROOT_FOLDER + "/views/email_templates/admin_invoice.html", 'utf8', function(err, result) {
                    var template = _self.parseTemplate(result, {
                        orders: orders,
                        base_url: base_url
                    });
                    _self.sendMail("no-reply@test.com",
                        settings.contact.email,
                        "User made a order",
                        template,
                        "text"
                    );
                    p_cal(null, {});
                })
            },
            function(p_cal) {
                fs.readFile(ROOT_FOLDER + "/views/email_templates/invoice.html", 'utf8', function(err, result) {
                    var template = _self.parseTemplate(result, {
                        orders: orders,
                        base_url: base_url
                    });
                    _self.sendMail("no-reply@test.com",
                        orders[0].user.email,
                        "You have made a order",
                        template,
                        "text"
                    );
                    p_cal(null, {});
                })
            }
        ], cb)
    })
}
