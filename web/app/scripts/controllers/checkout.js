'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('CheckoutCtrl', ['$routeParams', 'dpath', 'Product', 'Main', 'Cart', 'Checkout', "$location", "sessionService", 'endpoint', "$scope", function($routeParams, dpath, Product, Main, Cart, Checkout, $location, sessionService, endpoint, $scope) {
        var _this = this;
		
		var getCountry = Main.getCountry;
        var gC = new getCountry();
        gC.$get(function(data) {
			_this.country=data.response;
		});
		
        var getCart = Cart.getCart;
        var gC = new getCart();
        gC
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.carts = data.response;
                    var total = 0;
                    var ship = 0;
                    data.response.forEach(function(product) {
                        total += product.product_id.pricing.after_discount * product.product_quantity;
						if(product.product_id.paid_by_buyer==true)
                        ship += product.product_id.shipping_details.fee;
						else
							ship +=0;
                    });
                    $scope.header.totalprice = total;
                    _this.totalprice = total;
                    _this.shipprice = ship;
                    _this.overprice = ship + total;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
        var getAddress = Checkout.getAddress;
        var gA = new getAddress();
        gA
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
					if(data.response.shipping!=undefined){
						_this.ship = data.response.shipping;
						_this.bill = data.response.billing;
					}
					else{
						delete data.response.address._id;
						_this.ship = data.response.address[0];
						_this.bill = data.response.address[0];
					}
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

        this.addFormFields = function(form, data) {
            if (data != null) {
                $.each(data, function(name, value) {
                    if (value != null) {
                        var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                        form.append(input);
                    }
                });
            }
        }
		
        this.makePayment = function() {
			
			var getAdmin = Product.getAdmin;
			var gA = new getAdmin();
			gA
				.$get({
					guest_token: sessionService.get("token")
				}, function(data) {
					if (data.status == "success") {
					  _this.padmin = data.response;
						
					
            var data = {
                cmd: "_cart",
                business: _this.padmin.payment_gateway[0].email,
                return: dpath+'success',
                notify_url: dpath+'payment/notify-order/' + sessionService.get('user_token'),
                upload: 1,
                currency_code: "USD",
                cancel_return: dpath+'cancel'
            };
            var addShipAddress = Checkout.addShipAddress;
			
            var shipAddress = new addShipAddress(_this.ship);
            shipAddress.$get({
                guest_token: sessionService.get("token")
            }).then(function(datab) {
				if(datab.status=='fail')
					$location.path("/login");
                if (datab.status == "success") {
                    var addBillAddress = Checkout.addBillAddress;
                    var billAddress = new addBillAddress(_this.bill);
                    billAddress.$get({
                        guest_token: sessionService.get("token")
                    }).then(function(datas) {
                        if (datas.status == "success") {
                            var getCart = Cart.getCart;
                            var gC = new getCart();
                            gC
                                .$get({
                                    guest_token: sessionService.get("token")
                                }, function(datas) {
                                    if (datas.status == "success") {
                                        // item data
                                        var ctr = 1;
                                        datas.response.forEach(function(product) {
                                            data["item_number_" + ctr] = product.product_id.sku;
                                            data["item_name_" + ctr] = product.product_id.title;
                                            data["quantity_" + ctr] = product.product_quantity;
                                            data["amount_" + ctr] = product.product_id.pricing.after_discount.toFixed(2);
											if(product.product_id.paid_by_buyer==true)
                                            data["shipping_" + ctr] = product.product_id.shipping_details.fee.toFixed(2);
											else
                                            data["shipping_" + ctr] = 0;
										
                                            ctr++;
                                        });
                                        var form = $('<form/></form>');
                                        form.attr("action", "https://www."+_this.padmin.payment_gateway[0].mode+".paypal.com/cgi-bin/webscr");
                                        form.attr("method", "POST");
                                        form.attr("style", "display:none;");
                                        _this.addFormFields(form, data);
                                        $("body").append(form);
                                        form.submit();
                                        form.remove();
                                    }
                                });
                        }
                    });
                }
            });
			}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})

            // submit form

        }
    }])