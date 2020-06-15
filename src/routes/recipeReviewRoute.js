"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/middlewares');
const RecipeReviewController = require('../controllers/recipeReviewController');

//POST a new review
router.post('/:recipe', RecipeReviewController.addReview);
//GET list of reviews for a recipe
router.get('/:recipe', RecipeReviewController.listReviews);
//GET a review middlewares.checkAuthentication, 
router.get('/:recipe/:id', RecipeReviewController.getReview);
//UPDATE a review (still need a middleware to check ownership of review)
router.put('/:recipe/:id', RecipeReviewController.editReview);

module.exports = router;