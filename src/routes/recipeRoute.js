"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/middlewares');
const RecipeController = require('../controllers/recipeController');

//Create a recipe
router.post('/', RecipeController.create);
//View a recipe
router.get('/:id', RecipeController.read);
//Get all recipes
router.get('/', RecipeController.listRecipes);
//Get newest N recipes
router.get('/new/:amount', RecipeController.listNewRecipes);
//Get all recipes by a chef
router.get('/chef/:id', RecipeController.listRecipesByChefID);
//Update a recipe
router.put('/:id', RecipeController.update);
//Delete a recipe
router.delete('/:id', RecipeController.remove);
//Get Recipe Name
router.get('/recipeName/:id', RecipeController.readRecipeName);
//allTags
//router.get('/tags',RecipeController.getAllCategories);

module.exports = router;