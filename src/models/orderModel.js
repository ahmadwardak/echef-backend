"use strict";

const mongoose = require('mongoose');
const orderStatus = ["Ordered","Dispatched","Out for Delivery","Cancelled","Delivered"];


//Recipe Model Schema
const OrderSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderStatus: {
        type: String,
        enum: orderStatus,
        required: true
    },
    dateShipped:{
        type: Date
    },
    shoppingCart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'ShoppingCart',
        required: true
    },
    shipmentCost: {
        type: Number,
        required: true
    },
    
    totalCost: {
        type: Number,
        required: true
    },

    shippingInfo: {
        shippingAddress: {
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required:  true
        }

    }
});

OrderSchema.set('versionKey', false);

module.exports = {
    OrderModel: mongoose.model('Order', OrderSchema),
}