var express = require("express");
var router = express.Router();
var controller = require(ROOT_FOLDER + "/controllers/api/v1/user/order");
var auth = require(ROOT_FOLDER + "/middlewares/authentication");
router.get("/get-order", auth.partialAuthenticate, controller.getOrder);
module.exports = router;
