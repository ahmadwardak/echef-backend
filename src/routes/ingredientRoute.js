const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/middlewares');
const  ingredientController  = require('../controllers/ingredientController');


router.post('/ingredient', ingredientController.createIngredient);
router.put('/ingredient', ingredientController.updateIngredient);
router.get('/ingredient/:id',ingredientController.getIngredient);
router.get('/ingredient', ingredientController.getIngredients);
router.delete('/ingredient/:id', ingredientController.deleteIngredient)

module.exports = router;