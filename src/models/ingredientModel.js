"use strict";

const mongoose = require('mongoose');

// User Account Scheme
const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredientUnit: {
        type: String,
        required: true
    },
    ingredientBrands: [
    {
        brandName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }   
    ]
});

IngredientSchema.set('versionKey', false);

module.exports = mongoose.model('Ingredient', IngredientSchema);