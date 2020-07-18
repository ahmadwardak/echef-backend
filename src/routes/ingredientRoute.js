const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/middlewares');
const ingredientController = require('../controllers/ingredientController');

//middleware checkauth to allow only req with jwt token: for adding, updating and deleting
router.post('/', middlewares.checkAuthentication, ingredientController.createIngredient);
router.put('/:id', middlewares.checkAuthentication, ingredientController.updateIngredient);
router.get('/:id', ingredientController.getIngredient);
router.get('/', ingredientController.getIngredients);
router.delete('/:id', middlewares.checkAuthentication, ingredientController.deleteIngredient)

module.exports = router;