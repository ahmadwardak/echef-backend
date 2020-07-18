"use strict";

const mongoose = require('mongoose');
const SchemaTypes = mongoose.SchemaTypes;

const Float = require('mongoose-float').loadType(mongoose);
//Recipe Review Model
const RecipeReviewSchema = new mongoose.Schema({
    addedbyUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    heading: {
        type: String,
        required: true,
        maxlength: 50
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    detail: {
        type: String,
        required: true,
        maxlength: 1000
    },
    overallRating: {
        type: Float,
        min: 0,
        max: 5
    },
    qualityRating: {
        type: Float,
        min: 0,
        max: 5
    },
    valueForMoneyRating: {
        type: Float,
        min: 0,
        max: 5
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    imageCollection: {
        type: Array,
    },
    videoCollection: {
        type: Array,
    }
});

RecipeReviewSchema.set('versionKey', false);

module.exports = mongoose.model('RecipeReview', RecipeReviewSchema);