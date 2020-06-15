"use strict";

const mongoose = require('mongoose');
const SchemaTypes = mongoose.SchemaTypes;

const RecipeReviewSchema = new mongoose.Schema({
    addedbyUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    heading: {
        type: String,
        required: true,
        maxlength: 100
    },
    recipe: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true,
        maxlength: 1000
    },
    overallRating: {
        type: SchemaTypes.Decimal128,
        min: 0,
        max: 5
    },
    qualityRating: {
        type: SchemaTypes.Decimal128,
        min: 0,
        max: 5
    },
    valueForMoneyRating: {
        type: SchemaTypes.Decimal128,
        min: 0,
        max: 5
    }
});

RecipeReviewSchema.set('versionKey', false);

module.exports = mongoose.model('RecipeReview', RecipeReviewSchema);