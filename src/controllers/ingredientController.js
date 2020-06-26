"use strict";


const IngredientModel = require('../models/ingredientModel');


const getIngredient = (request, response, next) => {
    console.log("Get specific ingredient")
    IngredientModel.findById(request.params.id).then(ingr => {
        if (ingr) {
            response.json(ingr)
        }
        else {
            response.status(404).end()
        }
    }).catch(error => {
        console.error(error)
        response.status(400).send({ error: 'malformatted id' })
    }
    )

}

const getIngredients = (request, response, next) => {
    console.log("get All ingredients")
    IngredientModel.find({}).then(ingr => {
        response.json(ingr)
    })
}

const createIngredient = (request, response, next) => {
    console.log("Create")

    const ingredient = new IngredientModel(Object.assign(request.body))
    console.log(ingredient)
    ingredient.save().then(savedIngr => {
        response.json(savedIngr.toJSON())
    })
        .catch(error => {
            console.error(error)
        })
}

const updateIngredient = (request, response, next) => {
    console.log("Updating")
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
    console.log("Deleting")
    IngredientModel.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
}
// Useless? We had it in the Class Diagram
/* Unused
const getTagsList = (request, response, next) => {
    console.log("Get specific ingredient's Tags")
    IngredientModel.findById(request.params.id).then(ingr => {
        if (ingr) {
            response.json(ingr.tags)
        }
        else {
            response.status(404).end()
        }
    }).catch(error => {
        console.error(error)
        response.status(400).send({ error: 'malformatted id' })
    }
    )
}
*/

module.exports = {
    getIngredient,
    getIngredients,
   // getTagsList,
    updateIngredient,
    deleteIngredient,
    createIngredient
}