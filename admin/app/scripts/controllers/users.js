'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('UsersCtrl', ["users", function(users) {
    var _this = this;
    _this.title = "View Users";
    users.query(function(data) {
      if (data.status == "success") {
        _this.users = data.response.users;
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
    _this.updateStatus = function(id, status, index) {
      users.update({id:id},{status: status}, function (data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Updated Succesfully",
            status: data.status,
            type: "success"
          }
          _this.users[index].status = status;
        }
        else {
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
      })
    }

    _this.remove = function(id, index) {
      users.remove({
        id: id
      }, {}, function(data) {
        if (data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.users.splice(index, 1);
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
  .controller('UsersEditCtrl', [
    'users',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(users, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Edit Users";
      users.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.user = data.response.user;
          _this.user.upload_image = _this.user.image ? _this.user.image._id : "";
          _this.user.upload_banner = _this.user.banner ? _this.user.banner._id : "";
          _this.user.upload_logo = _this.user.logo ? _this.user.logo._id : "";
          _this.user.role = _this.user.roles ? _this.user.roles[0] : "";
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
      _this.saveUser = function() {
        var user = angular.copy(_this.user);
        user.image = user.upload_image ? user.upload_image : null;
        user.banner = user.upload_banner ? user.upload_banner : null;
        user.logo = user.upload_logo ? user.upload_logo : null;
        user.roles = user.role ? user.role : null;
        delete user.upload_image;
        delete user.upload_banner;
        delete user.upload_logo;
        delete user.role;
        users.update({
          id: $routeParams.id
        }, user, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
      _this.imageUpload = function(file, name) {
        Upload.upload({
          url: endpoint + '/images/upload-single-image',
          data: {
            image: file
          }
        }).then(function(resp) {
          if (resp.data.status == "success") {
            _this.user[name] = resp.data.response;
            _this.user['upload_' + name] = resp.data.response._id;
          } else {
            _this.notify = {
              message: resp.statusMessage,
              status: resp.status,
              type: "danger"
            }
          }
        }, function(resp) {
          _this.notify = {
            message: resp.statusMessage,
            status: resp.status,
            type: "danger"
          }
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          _this[name + "ProgressPercentage"] = progressPercentage;
        });
      }
    }
  ])
  .controller('UsersAddCtrl', [
    'users',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(users, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Add Users";
      _this.saveUser = function() {
        var user = angular.copy(_this.user);
        user.image = user.upload_image ? user.upload_image : null;
        user.banner = user.upload_banner ? user.upload_banner : null;
        user.logo = user.upload_logo ? user.upload_logo : null;
        user.roles = user.role ? user.role : null;
        delete user.upload_image;
        delete user.upload_banner;
        delete user.upload_logo;
        delete user.role;
        users.create({}, user, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
      _this.imageUpload = function(file, name) {
        Upload.upload({
          url: endpoint + '/images/upload-single-image',
          data: {
            image: file
          }
        }).then(function(resp) {
          if (resp.data.status == "success") {
            _this.user[name] = resp.data.response;
            _this.user['upload_' + name] = resp.data.response._id;
            _this.notify = {
              message: resp.statusMessage,
              status: resp.status,
              type: "success"
            }
          } else {
            _this.notify = {
              message: resp.statusMessage,
              status: resp.status,
              type: "danger"
            }
          }
        }, function(resp) {
          _this.notify = {
            message: resp.statusMessage,
            status: resp.status,
            type: "danger"
          }
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          _this[name + "ProgressPercentage"] = progressPercentage;
        });
      }
    }
  ])
  .controller('ChangePasswordCtrl', [
    "users",
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(users, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Change Password";
      _this.saveUser = function() {
        users.changePassword({
          id: $routeParams.id
        }, _this.password, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
    }
  ])
  .controller('ProfileEditCtrl', [
    "users",
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(users, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Edit Profile";
      users.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.user = data.response.user;
          _this.user.upload_image = _this.user.image ? _this.user.image._id : "";
          _this.user.upload_banner = _this.user.banner ? _this.user.banner._id : "";
          _this.user.upload_logo = _this.user.logo ? _this.user.logo._id : "";
          _this.user.role = _this.user.roles ? _this.user.roles[0] : "";
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
      _this.saveUser = function() {
        var user = angular.copy(_this.user);
        user.image = user.upload_image ? user.upload_image : null;
        user.banner = user.upload_banner ? user.upload_banner : null;
        user.logo = user.upload_logo ? user.upload_logo : null;
        user.roles = user.role ? user.role : null;
        delete user.upload_image;
        delete user.upload_banner;
        delete user.upload_logo;
        delete user.role;
        users.update({
          id: $routeParams.id
        }, user, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
      _this.imageUpload = function(file, name) {
        Upload.upload({
          url: endpoint + '/images/upload-single-image',
          data: {
            image: file
          }
        }).then(function(resp) {
          if (resp.data.status == "success") {
            _this.user[name] = resp.data.response;
            _this.user['upload_' + name] = resp.data.response._id;
          } else {
            _this.notify = {
              message: resp.statusMessage,
              status: resp.status,
              type: "danger"
            }
          }
        }, function(resp) {
          _this.notify = {
            message: resp.statusMessage,
            status: resp.status,
            type: "danger"
          }
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          _this[name + "ProgressPercentage"] = progressPercentage;
        });
      }
    }
  ]);
