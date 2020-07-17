"use strict";

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const middlewares = require('../middlewares/middlewares');
const RecipeController = require('../controllers/recipeController');

const mimetypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/recipes/');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName);
    }
});
const fileFilter = (req, file, cb) => {
    if (!req.files || !req.files.file || !mimetypes.includes(req.files.file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg, .jpeg, .gif format allowed'));
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});



//Create a recipe
router.post('/', middlewares.checkAuthentication, upload.single('recipeImageURL'), RecipeController.create);
//View a recipe
router.get('/:id', RecipeController.read);
//Get all recipes
router.get('/', RecipeController.listRecipes);
//Get newest N recipes
router.get('/new/:amount', RecipeController.listNewRecipes);
//Get all recipes by a chef
router.get('/chef/:id', middlewares.checkAuthentication, RecipeController.listRecipesByChefID);
//Update a recipe
router.put('/:id', middlewares.checkAuthentication, upload.single('recipeImageURL'), RecipeController.update);
//Delete a recipe
router.delete('/:id', middlewares.checkAuthentication, RecipeController.remove);
//Get Recipe Name
router.get('/recipeName/:id', RecipeController.readRecipeName);
//allTags
//router.get('/tags',RecipeController.getAllCategories);

module.exports = router;