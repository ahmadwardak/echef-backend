"use strcit";

const {ShoppingCartModal} = require('../models/shoppingCartModal');


//add to shopping cart
const create = async(req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    ShoppingCartModal.create(req.body)
        .then(cart => res.status(201).json(cart))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

//Viewing a shopping cart
const read   = (req, res) => {
    ShoppingCartModal.findById(req.params.id).exec()
        .then(cart => {
            console.log(req);
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
const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ShoppingCartModal.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(cart => res.status(200).json(cart))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    create,
    read,
    update
};