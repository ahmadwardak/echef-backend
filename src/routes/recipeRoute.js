"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/middlewares');
const RecipeController = require('../controllers/recipeController');

//Create a recipe
router.post('/', RecipeController.create);
//View a recipe
router.get('/:id', RecipeController.read);
//Update a recipe
router.put('/:id', RecipeController.update);
//Delete a recipe
router.delete('/:id', RecipeController.remove);

module.exports = router;