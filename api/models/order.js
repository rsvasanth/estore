var mongoose = require("mongoose");
var randomChar = require("node-random-chars");
var Schema = mongoose.Schema;
var tableSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    guest_token: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    total_price: {
        type: Number
    },
    total_shipping: {
        type: Number
    },
    total_tax: {
        type: Number
    },
    products: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Product_catelog'
        },
        shop_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        variant: String,
        quantity: Number,
        price: Number,
        status: {
            type: String,
            default: "Not Approved"
        },
        tracking: {
            company: {
                type: String,
                default: null
            },
            tracking_number: {
                type: String,
                default: null
            },
            status: {
                type: String,
                default: "Approved"
            },
            estimated_delivery: {
                type: Date,
                default: null
            }
        }
    }],
    payment: {
        method: {
          type: String,
          default: "Paypal"
        },
        status: String,
        transaction_id: String
    },
    shipping: {
        name: String,
        address: String,
        city: String,
        state: String,
        country: String,
        phone: String
    },
    billing: {
        name: String,
        address: String,
        city: String,
        state: String,
        country: String,
        phone: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: Date,
    updated_at: Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'orders'
});
module.exports = DB_CONNECTION.model("Order", tableSchema);
