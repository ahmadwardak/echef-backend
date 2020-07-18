"use strcit";
const fs = require('fs');
const { RecipeModel, categories, difficultyLevels } = require('../models/recipeModel');
const RecipeReviewModel = require('../models/recipeReviewModel');
const _ = require('lodash');

//Listing all categories
const listCategories = (req, res) => {
    res.status(200).json(categories);
};

//Listing all difficulty levels in cooking
const listLevels = (req, res) => {
    res.status(200).json(difficultyLevels);
};

//Creating a new recipe
const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    //creating a complete url for recipe image by adding host url before filename and storing it in recipeImageURL as string
    let file = "";
    let url = req.protocol + '://' + req.get('host');
    if (req.file) {
        file = url + '/public/uploads/recipes/' + req.file.filename;
    }
    req.body.ingredients = JSON.parse(req.body.ingredients);
    let recipe = {
        ...req.body,
        recipeImageURL: file,
    };
    RecipeModel.create(recipe)
        .then(recipe => res.status(201).json(recipe))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

//Viewing a recipe along with Overall rating obtained from recipe reviews
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

            //calculating the overall rating of the recipe
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
const update = async (req, res) => {

    try {
        let recipe = await RecipeModel.findOne({ _id: req.params.id }).exec();
        if (!recipe) {
            return res.status(404).json({
                error: 'Not found',
                message: 'Recipe not found'
            });
        }
        //parse the ingredients provided as string into JSON
        req.body.ingredients = JSON.parse(req.body.ingredients);

        //if recipe image is provided, then creating a complete url for recipe image by adding host url before filename 
        // and storing it in recipeImageURL as string, replacing the old url
        if (req.file !== undefined) {
            let file = "";
            let url = req.protocol + '://' + req.get('host');
            file = url + '/public/uploads/recipes/' + req.file.filename;
            recipe.recipeImageURL = file;
        }

        recipe.title = req.body.title;
        recipe.servingSize = req.body.servingSize;
        recipe.description = req.body.description;
        recipe.difficulty = req.body.difficulty;
        recipe.category = req.body.category;
        recipe.ingredients = req.body.ingredients;

        recipe.save(function (error) {
            if (error)
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            else

                res.status(200).json(recipe);
        });

    } catch (error) {
        return res.status(404).json({
            error: 'Internal server error',
            message: error.message
        });
    }

};

//Deleting a recipe
const remove = async (req, res) => {

    let recipe;
    try {
        recipe = await RecipeModel.findOne({ _id: req.params.id })
            .populate('recipereviews').exec();
        if (!recipe) {
            return res.status(404).json({
                error: 'Not found',
                message: 'Recipe not found'
            });
        }
    } catch (error) {
        return res.status(404).json({
            error: 'Not found',
            message: 'Recipe not found'
        });
    }

    //Checking if there are any images and videos for reviews and deleting them
    try {
        let reviews = recipe.recipereviews;
        reviews.map(review => {
            review.imageCollection.map(img => {
                let path = './public/uploads/reviews/' + img.substr(img.lastIndexOf('/') + 1);
                fs.access(path, fs.F_OK, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    fs.unlink(path, (err) => {
                        if (err) throw err;
                        // console.log('successfully deleted' + path);
                    });
                })


            });
            review.videoCollection.map(vid => {
                let path = './public/uploads/reviews/' + vid.substr(vid.lastIndexOf('/') + 1);
                fs.access(path, fs.F_OK, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    fs.unlink(path, (err) => {
                        if (err) throw err;
                        // console.log('successfully deleted' + path);
                    });
                })
            });
        })

        //Delete all reviews related to the recipe
        await RecipeReviewModel.deleteMany({ recipe: recipe })
            .then(ret => res.status(200).json({ message: `All Recipe Reviews Deleted.` }))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));

        // Deleting the image of a recipe
        if (recipe.recipeImageURL) {
            let path = './public/uploads/recipes/' + recipe.recipeImageURL.substr(recipe.recipeImageURL.lastIndexOf('/') + 1);
            fs.access(path, fs.F_OK, (err) => {
                if (err) {
                    console.error(err)
                    return
                }

                fs.unlink(path, (err) => {
                    if (err) throw err;
                });
            })
        }
        //finally remove the recipe itself
        await recipe.remove();
        res.status(200).json({ message: 'Recipe Deleted.' });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });

    }

};

//Listing all the recipes along with chef name and reviews. Plus recipe overall rating is also calculated and added to the recipe
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

            //calculating the overall rating from the reviews if exist
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
};

//Listing newest N  recipes
const listNewRecipes = (req, res) => {
    RecipeModel.find({})
        .sort("-dateCreated")
        .limit(Number(req.params.amount))
        .populate('createdByChef', '_id fullName').exec()
        .then(recipes => res.status(200).json(recipes))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
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


//Viewing a recipe
const readRecipeName = async (req, res) => {
    await RecipeModel.findById(req.params.id)
        .select('title')
        .exec()
        .then(recipe => {
            // console.log(req);
            if (!recipe) return res.status(404).json({
                error: 'Not Found',
                message: `Recipe not found`
            });

            res.status(200).json(recipe)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
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
    listNewRecipes,
    readRecipeName
};