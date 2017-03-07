var express = require("express");
var router = express.Router();
var passport = require("passport");
var controller = require(ROOT_FOLDER + "/controllers/api/v1/user/account");
var auth = require(ROOT_FOLDER + "/middlewares/authentication");
router.get("/get-details", auth.partialAuthenticate, controller.getDetails);
router.post("/save-details", auth.partialAuthenticate, controller.saveDetails);
router.put("/update", passport.authenticate("token", {
    session: false
}), controller.update);
router.post("/change-password", auth.partialAuthenticate, controller.updatePassword);
module.exports = router;
