"use strict";

const config = require('../config/config');
const IngredientModel = require('../models/ingredientModel');
//const ingredientRouter = require('express').Router()

const getIngredient = (request,response,next) => {
    console.log("Get specific ingredient")
    IngredientModel.findById(request.params.id).then(ingr =>{
        if(ingr){
            response.json(ingr)
        }
        else{
            response.status(404).end()
        }
    }).catch(error => {console.error(error)
        response.status(400).send({ error: 'malformatted id' })}
    )
    
}

const getIngredients = (request,response,next) => {
    console.log("get All ingredients")
    IngredientModel.find({}).then(ingr => {
        response.json(ingr)
    })
}

const createIngredient = (request,response,next) => {
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

const updateIngredient = (request,response,next) => {

}

const deleteIngredient = (request,response,next) => {

}

const getTagsList = (request,response,next) => {

}

module.exports = {
    getIngredient,
    getIngredients,
    getTagsList,
    updateIngredient,
    deleteIngredient,
    createIngredient
}