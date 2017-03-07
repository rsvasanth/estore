var express = require("express");
var router = express.Router();
var controller = require(ROOT_FOLDER + "/controllers/api/v1/user/checkout");
var auth = require(ROOT_FOLDER + "/middlewares/authentication");
router.post("/add-billaddress", auth.partialAuthenticate, controller.addBillAddress);
router.post("/add-shipaddress", auth.partialAuthenticate, controller.addShipAddress);
router.get("/get-address", auth.partialAuthenticate, controller.getAddress);
module.exports = router;
