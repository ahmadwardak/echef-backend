"use strict";

const express = require('express');
const router = express.Router();

const ShoppingcartController = require('../controllers/shoppingCartController');

router.post('/', ShoppingcartController.create);
router.get('/:id', ShoppingcartController.getShoppingCartByUserID);
router.put('/:id', ShoppingcartController.updateByUserID);
router.get('/count/:id', ShoppingcartController.getShoppingCartRecipeCountByUserID);

module.exports = router;