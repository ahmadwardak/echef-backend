"use strict";

const express  = require('express');
const router   = express.Router();

const RecipeController = require('../controllers/recipeController');

// List all categories
router.get('/', RecipeController.listCategories); 

module.exports = router;