"use strict";

const mongoose = require('mongoose');

const categories = ["Italian","Indian","Spanish","Mexican","American","German","Iranian","Brazilian","Japanese","Chinese"];
const difficultyLevels = ["Easy","Intermediate","Hard"];

//Recipe Model Schema
const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    servingSize: {
        type: Number,
        default: 2,
        required: true
    },
    difficulty:{
        type: String,
        enum: difficultyLevels,
        required:true
    },
    category:{
        type: String,
        enum: categories,
        required: true
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
        required:true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: String,
        required:true
    }]
});

RecipeSchema.set('versionKey', false);

module.exports = {
    RecipeModel: mongoose.model('Recipe', RecipeSchema),
    categories
}