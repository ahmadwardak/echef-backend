"use strcit";

const { ShoppingCartModel } = require('../models/shoppingCartModel');


//add to shopping cart
const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    ShoppingCartModel.create(req.body)
        .then(cart => res.status(201).json(cart))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

//Viewing a shopping cart
const getShoppingCartByUserID = (req, res) => {
    ShoppingCartModel.find({ customerID: req.params.id }).exec()
        .then(cart => {
            // console.log(req);
            if (!cart) return res.status(404).json({
                error: 'Not Found',
                message: `Shopping  cart not found`
            });

            res.status(200).json(cart)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

//Updating cart
const updateByUserID = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ShoppingCartModel.findOneAndUpdate({ customerID: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec()
        .then(cart => res.status(200).json(cart))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
//get cart items count
const getShoppingCartRecipeCountByUserID = (req, res) => {
    ShoppingCartModel.find({ customerID: req.params.id }).exec()
        .then(cart => {
            // console.log(req);

            var response = 0;
            if (cart.length != 0) {
                cart[0].cartItems.forEach(element => {
                    response = response + element.recipeIngredients.length;
                });
            }
            res.status(200).json(response);

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

const removeByUserID = (req, res) => {
    ShoppingCartModel.findOneAndRemove({ customerID: req.params.id }).exec()
        .then((cart) => res.status(200).json({ message: `Shopping cart was removed` }))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


module.exports = {
    create,
    getShoppingCartByUserID,
    getShoppingCartRecipeCountByUserID,
    removeByUserID,
    updateByUserID
};