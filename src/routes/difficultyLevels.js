"use strict";

const express  = require('express');
const router   = express.Router();

const RecipeController = require('../controllers/recipeController');

// List all cooking levels
router.get('/', RecipeController.listLevels); 

module.exports = router;