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
        default: 'Ordered'
    },
    dateShipped:{
        type: Date
    },
    cartItems: [
            {
                recipeID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Recipe',
                    required: true
                },
                recipeIngredients: [
                    {
                        ingredientID:{
                            type: mongoose.Schema.Types.ObjectId,
                            required: true,
                            ref: 'Ingredient'
                        },
                        ingredientQuantity: {
                            type: Number,
                            required: true
                        },
                        ingredientBrand:{
                            type: String,
                            required: true
                        },
                        price: {
                            type: Number,
                            required: true
                        }
                    }
                ]
    
            }
    ],
    itemsPrice: {
        type: Number,
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
        FirstName:{
            type: String,
            required: true
        },
        LastName:{
            type: String,
            required: true
        },
        AddressLine1: {
            type: String,
            required: true
        },
        AddressLine2:{
            type: String
        },
        City:{
            type: String,
            required: true
        },
        Country:{
            type: String,
            required: true
        },
        Region:{
            type: String,
            required: true
        },
        Zipcode: {
            type: String,
            required:  true
        }

    }
});

OrderSchema.set('versionKey', false);

module.exports = {
    OrderModel: mongoose.model('Order', OrderSchema),
}