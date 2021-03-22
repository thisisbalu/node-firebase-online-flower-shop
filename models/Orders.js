const mongoose = require('mongoose');
const uniqid = require('uniqid');

const OrdersSchema = mongoose.Schema({
    createdOn: {
        type: Date,
        default: Date.now
    },
    userName: String,
    shipping: {
        name: String,
        address: String,
        province: String,
        country: String,
        postalCode: String
    },
    tracking: {
        vendor: {
            type: String,
            default: 'UPS'
        },
        trackingNumber: {
            type: String,
            default: uniqid().toUpperCase()
        },
        status: {
            type: String,
            default: 'PENDING'
        }
    },
    payment: {
        cardNumber: String,
        expiry: String,
        cvv: String,
        cardName: String
    },
    cost: Number,
    products: [
        {
            sku: String,
            title: String,
            price: Number
        }
    ]
});

module.exports = mongoose.model('Orders', OrdersSchema);