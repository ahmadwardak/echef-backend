const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/middlewares');
const  ingredientController  = require('../controllers/ingredientController');


router.post('/', ingredientController.createIngredient);
router.put('/:id', ingredientController.updateIngredient);
router.get('/:id',ingredientController.getIngredient);
router.get('/', ingredientController.getIngredients);
router.delete('/:id', ingredientController.deleteIngredient)

module.exports = router;