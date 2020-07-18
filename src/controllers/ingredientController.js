"use strict";


const IngredientModel = require('../models/ingredientModel');


const getIngredient = async (request, response, next) => {
    // console.log("Get specific ingredient")
    await IngredientModel.findById(request.params.id).then(ingr => {
        if (ingr) {
            response.json(ingr)
        }
        else {
            response.status(404).end()
        }
    }).catch(error => {
        // console.error(error)
        response.status(400).send({ error: 'malformatted id' })
    }
    )

}

const getIngredients = async (request, response, next) => {
    // console.log("get All ingredients")
    await IngredientModel.find({}).then(ingr => {
        response.json(ingr)
    })
}

const createIngredient = (request, response, next) => {
    // console.log("Create")

    const ingredient = new IngredientModel(Object.assign(request.body))
    // console.log(ingredient)
    ingredient.save().then(savedIngr => {
        response.json(savedIngr.toJSON())
    })
        .catch(error => {
            console.error(error)
        })
}

const updateIngredient = (request, response, next) => {
    // console.log("Updating")
    const ingredient = Object.assign(request.body)


    IngredientModel.findByIdAndUpdate(request.params.id, ingredient, { new: true })
        .then(updatedIngredient => {
            response.json(updatedIngredient.toJSON())
        })
        .catch(error => {
            console.error(error)
        })
}

const deleteIngredient = (request, response, next) => {
    // console.log("Deleting")
    IngredientModel.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
}

module.exports = {
    getIngredient,
    getIngredients,
    // getTagsList,
    updateIngredient,
    deleteIngredient,
    createIngredient
}