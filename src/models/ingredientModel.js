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
    ingredientBrand: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
});

IngredientSchema.set('versionKey', false);

module.exports = mongoose.model('Ingredient', IngredientSchema);