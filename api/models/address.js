var mongoose = require("mongoose");
var randomChar = require("node-random-chars");
var Schema = mongoose.Schema;
var tableSchema = new Schema({
    first_name: String,
    last_name: String,
    phone: String,
    pincode: String,
    address: String,
    phone: String,
    city: String,
    state: String,
    country: String,
    locality: String,
    created_at: Date,
    updated_at: Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
module.exports = DB_CONNECTION.model("Address", tableSchema);
