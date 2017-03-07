var mongoose = require("mongoose");
var randomChar = require("node-random-chars");
var Schema = mongoose.Schema;
var tableSchema = new Schema({
    name: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        unique: [true, "Email is already exists"]
    },
    roles: [{
        type: String
    }],
    password: String,
    token: String,
    tokenExpiry: Date,
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    shipping: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    billing: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    banner: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    phone: String,
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: Date,
    govt_issue_card: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    business_registration: String,
    updated_at: Date,
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
tableSchema.statics.loginAsAdmin = function(body, cb) {
    return this.findOne({
            email: body.email,
            roles: "admin"
        })
        .exec(function(err, user) {
            if (!user)
                return cb({
                    message: "Invalid Mail",
                    statusCode: 401
                });
            var validUser = user.checkPassword(body.password);
            if (validUser) {
                if (user.status == false) {
                    return cb({
                        message: "You have been banned. Please contact admin.",
                        statusCode: 401
                    });
                }
                delete user.password;
                return cb(null, user);
            }
            return cb({
                message: "Invalid Password",
                statusCode: 401
            });
        });
};
tableSchema.statics.loginAsUser = function(email, password, cb) {
    return this.findOne({
            email: email,
            roles: "user"
        })
        .exec(function(err, user) {
            if (!user)
                return cb({
                    message: "the entered email ID is not registered",
                    statusCode: 401
                });

            var validUser = user.checkPassword(password);
            if (validUser) {
                if (user.verified == false) {
                    return cb({
                        message: "You are not activated. Please confirmed your email id.",
                        statusCode: 401
                    });
                }
                delete user.password;
                return cb(null, user);
            }
            return cb({
                message: "The username and password doesn't match",
                statusCode: 401
            });
        });
};
tableSchema.statics.loginAsSeller = function(email, password, cb) {
    return this.findOne({
            email: email,
            roles: "seller"
        })
        .exec(function(err, user) {
            if (!user)
                return cb({
                    message: "Invalid Mail",
                    statusCode: ""
                });
            var validUser = user.checkPassword(password);
            if (validUser) {
                delete user.password;
                return cb(null, user);
            }
            return cb({
                message: "Invalid Password",
                statusCode: ""
            });
        });
};
tableSchema.statics.findAndModify = function(query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};
tableSchema.methods.checkPassword = function checkPassword(password) {
    return this.password === password;
};
tableSchema.methods.updateToken = function updateToken(cb) {
    var token = this.token = randomChar.create(32);
    console.log(token)
    this.save(function(err, updated) {
        cb(err, token);
    });
};
module.exports = DB_CONNECTION.model("User", tableSchema);
