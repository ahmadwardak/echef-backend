"use strict";

const mongoose = require('mongoose');

const categories = ["Italian","Indian","Spanish","Mexican","American","German","Iranian","Brazilian","Japanese","Chinese"];

//Recipe Model Schema
const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        //required: true
    },
    servingSize: {
        type: Number,
        default: 2
    },
    category:{
        type: String,
        enum: categories
    },
    ingredients: [{
        ingredientID:{
            type: mongoose.Schema.Types.ObjectId,
            //ref: 'Ingredient'
        },
        ingredientQuantity: {
            type: Number
        },
        ingredientBrand:{
            type: String
        }
    }],
    createdByChef: {
        type: mongoose.Schema.Types.ObjectId,
        //ref: 'User'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: String
    }]
});

RecipeSchema.set('versionKey', false);

module.exports = {
    RecipeModel: mongoose.model('Recipe', RecipeSchema),
    categories
}