'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:SiteConfigurationCtrl
 * @description
 * # SiteConfigurationCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('HomePageConfigurationCtrl', ['homePageConfiguration', 'Upload', 'endpoint', function(homePageConfiguration, Upload, endpoint) {
    var _this = this;
    _this.title = "Main Page Configuration";
    _this.configuration = {};
    _this._t_m_banner = {};
    homePageConfiguration.getConfiguration({}, {}, function(data) {
      if (data.status == "success") {
        _this.configuration = data.response;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
    _this.editBanner = function(index, type) {
      if(type == "main_banner")
        _this._t_m_banner = _this.configuration[type][index];
      else if(type == "sub_banner")
        _this._t_s_banner = _this.configuration[type][index];
      else
          _this.images = _this.configuration[type][index];
          $('html, body').animate({scrollTop: 0},600);
    };
    _this.deleteBanner = function(index, type) {
      _this.configuration[type].splice(index, 1);
    };
    _this.pushTempToSource = function(item, source) {
      if (!_this.configuration[source])
        _this.configuration[source] = [];
      if (_this.configuration[source].indexOf(item) !== -1) {
        if(source == "main_banner")
          _this._t_m_banner = "";
        else if(source == "sub_banner")
          _this._t_s_banner = "";
        else
          _this.images = "";
        return;
      }
      _this.configuration[source].push(item);
    }
    _this.imageUpload = function(file, name) {
      Upload.upload({
        url: endpoint + '/images/upload-single-image',
        data: {
          image: file
        }
      }).then(function(resp) {
        var data = resp.data;
        if (data.status == "success") {
          _this[name].image = data.response;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(resp) {
        var data = resp.data;
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        _this[name + "ProgressPercentage"] = progressPercentage;
      });
    };
    _this.saveConfiguration = function() {
      var configuration = angular.copy(_this.configuration);
      homePageConfiguration.saveConfiguration({}, configuration, function(data) {
        if (data.status == "success") {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "success"
          }
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }])
  .controller('SiteConfigurationCtrl', ['siteConfiguration', 'Upload', 'endpoint', function(siteConfiguration, Upload, endpoint) {
    var _this = this;
    _this.title = "Admin Configuration";
    siteConfiguration.getConfiguration({}, {}, function(data) {
      if (data.status == "success") {
        _this.configuration = data.response;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
    _this.removeUnits = function(index) {
      _this.configuration.units.splice(index, 1);
    };
    _this.addUnits = function() {
      if (_this.configuration.units.indexOf(_this.units) === -1)
        _this.configuration.units.push(_this.units);
      _this.units = "";
    };
    _this.imageUpload = function(file, name) {
      Upload.upload({
        url: endpoint + '/images/upload-single-image',
        data: {
          image: file
        }
      }).then(function(resp) {
        var data = resp.data;
        if (data.status == "success") {
          _this.configuration[name] = data.response;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(resp) {
        var data = resp.data;
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        _this[name + "ProgressPercentage"] = progressPercentage;
      });
    };
    _this.removeShipsIn = function(index) {
      _this.configuration.ships_in.splice(index, 1);
    };
    _this.addShipsIn = function() {
      if (_this.configuration.ships_in.indexOf(_this.ships_in) === -1)
        _this.configuration.ships_in.push(_this.ships_in);
      _this.ships_in = "";
    };
    _this.addSocialLinks = function() {
      if (_this.configuration.social_links.indexOf(_this.social_links) === -1)
        _this.configuration.social_links.push(_this.social_links);
      _this.social_links = "";
    };
    _this.removeSocialLinks = function(index) {
      _this.configuration.social_links.splice(index, 1);
    };
    _this.saveConfiguration = function() {
      var configuration = angular.copy(_this.configuration);
      configuration.overall_banner =configuration.overall_banner._id;
      siteConfiguration.saveConfiguration({}, configuration, function(data) {
        if (data.status == "success") {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "success"
          }
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }]);
