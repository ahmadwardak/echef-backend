"use strcit";

const { RecipeModel, categories, difficultyLevels } = require('../models/recipeModel');
const _ = require('lodash');

//Listing all categories
//new comments in my branch....
const listCategories = (req, res) => {
    res.status(200).json(categories);
};

const listLevels = (req, res) => {
    res.status(200).json(difficultyLevels);
};

//Creating a new recipe
const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    RecipeModel.create(req.body)
        .then(recipe => res.status(201).json(recipe))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

//Viewing a recipe
const read = (req, res) => {
    RecipeModel.findById(req.params.id)
        .populate('recipereviews')
        .exec()
        .then(recipe => {
            // console.log(req);
            if (!recipe) return res.status(404).json({
                error: 'Not Found',
                message: `Recipe not found`
            });

            var total = 0;
            for (var i = 0; i < _.size(recipe.recipereviews); i++) {
                total += recipe.recipereviews[i].overallRating;
            }
            var avg = total / recipe.recipereviews.length;

            res.status(200).json({ recipe: recipe, OverallRating: avg })

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};


//Updating an existing recipe
const update = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    RecipeModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).exec()
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

//Deleting a recipe
const remove = (req, res) => {
    RecipeModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({ message: `Recipe with id${req.params.id} was deleted` }))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

//Listing all the recipes
const listRecipes = (req, res) => {
    RecipeModel.find({})
        .populate('createdByChef', '_id fullName')
        .populate('recipereviews')
        .exec()
        .then(recipes => {
            // console.log(req);
            if (!recipes) return res.status(404).json({
                error: 'Not Found',
                message: `No receipes found`
            });

            recipes.map(function (recipe) {
                var total = 0;
                for (var i = 0; i < _.size(recipe.recipereviews); i++) {
                    total += recipe.recipereviews[i].overallRating;
                }
                var avg = total / recipe.recipereviews.length;
                recipe.set('OverallRating', avg, { strict: false });
                return recipe;
            });

            res.status(200).json(recipes);

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

    // RecipeModel.find({})
    //     .populate('createdByChef', '_id fullName')
    //     .populate('recipereviews').exec()
    //     .then(recipes => res.status(200).json(recipes))
    //     .catch(error => res.status(500).json({
    //         error: 'Internal server error',
    //         message: error.message
    //     }));
};

//Listing newest N  recipes
const listNewRecipes = (req, res) => {
    //console.log("One")
    RecipeModel.find({})
        .sort("-dateCreated")
        .limit(Number(req.params.amount))
        .populate('createdByChef', '_id fullName').exec()
        .then(recipes => res.status(200).json(recipes))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
        //console.log("Three")
};

//Listing all the recipes created by a Chef
const listRecipesByChefID = (req, res) => {
    RecipeModel.find({ createdByChef: req.params.id })
        .then(recipes => res.status(200).json(recipes))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    listCategories,
    listLevels,
    create,
    read,
    update,
    remove,
    listRecipes,
    listRecipesByChefID,
    listNewRecipes
    // getAllCategories
};