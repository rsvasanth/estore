ROOT_FOLDER = __dirname;
BASE_URL = "http://45.55.165.182:3000/";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var mongoose = require("mongoose");
var options = {
  user: 'provenlogic7',
  pass: 'provenlogic75wew5'
};
//DB_CONNECTION = mongoose.connect("mongodb://root:root@provenlogic.xyz:18754/prime", options)
require("./config/db");
require("./config/auth");
var app = express();
var nconf = require('nconf');
var ev = require('express-validation');
nconf.file('./config/config.json');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res._response = function (result, status, code, message) {
    var output = {};
    output.statusCode = code || 200;
    output.statusMessage = message || "success";
    output.status = status || "success";
    output.response = result;
    res.json(output);
  };
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use("/api/v1", require(ROOT_FOLDER+"/routes/api/v1"));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        var response = {};
        response.statusCode    = err.status || 500;
        response.statusMessage = err.statusMessage || err.message || err.stack || "Unknown Error";
        response.errors = err.errors || "";
        response.status = "fail";
        res.json(response);
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    var response = {};
    response.statusCode    = err.status || 500;
    response.statusMessage = err.statusMessage || err.message || err.stack || "Unknown Error";
    response.errors = err.errors || "";
    response.status        = "fail";
    res.json(response);
})
module.exports = app;
