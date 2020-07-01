"use strict";

const mongoose = require('mongoose');


//Recipe Model Schema
const ShoppingCartSchema = new mongoose.Schema({
    cartItems: [
        {
            recipeID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            recipeIngredients: [
                {
                    ingredientID:{
                        type: mongoose.Schema.Types.ObjectId,
                        required: true
                        //ref: 'Ingredient'
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
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

ShoppingCartSchema.set('versionKey', false);

module.exports = {
    ShoppingCartModal: mongoose.model('ShoppingCart', ShoppingCartSchema),
}