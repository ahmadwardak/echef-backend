"use strict";

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const middlewares = require('../middlewares/middlewares');
const RecipeReviewController = require('../controllers/recipeReviewController');
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'video/mp4', 'video/quicktime', 'video/x-ms-wmv', 'video/x-msvideo', 'video/MP2T'];

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/reviews/');
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
        return cb(new Error('Only .png, .jpg, .jpeg, .gif, .mp4, .mov, .wmv, .avi format allowed'));
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

//POST a new review
router.post('/:recipe', upload.array('fileCollection', 2), RecipeReviewController.addReview);
//GET list of reviews for a recipe
router.get('/:recipe', RecipeReviewController.listReviews);
//GET a review middlewares.checkAuthentication, 
router.get('/:recipe/:id', RecipeReviewController.getReview);
//UPDATE a review (still need a middleware to check ownership of review)
router.put('/:recipe/:id', RecipeReviewController.editReview);

module.exports = router;