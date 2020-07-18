"use strict";

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const middlewares = require('../middlewares/middlewares');
const RecipeReviewController = require('../controllers/recipeReviewController');
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'video/mp4', 'video/quicktime', 'video/x-ms-wmv', 'video/x-msvideo', 'video/MP2T'];

//multer is used to upload recipe review files (allowing only above mentioned minetypes of videos and images)
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/reviews/'); //path to store 
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-'); //removing spaces from filename, as it will be used to create imageurl
        cb(null, uuidv4() + '-' + fileName); //adding a uuid to the filename inorder to avoid filename collision if different users provide review image/video with same name which already exists for another review... for example image1, image2 
    }
});
//filtering only the required filetypes
const fileFilter = (req, file, cb) => {
    if (!req.files || !req.files.file || !mimetypes.includes(req.files.file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg, .jpeg, .gif, .mp4, .mov, .wmv, .avi format allowed'));
    }
}
//5mb file size allowed
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

//POST a new review, middleware checkauth is added so only logged in user can add reviews, and middleware upload using multer is added to upload images/videos
router.post('/:recipe', middlewares.checkAuthentication, upload.array('fileCollection', 2), RecipeReviewController.addReview);
//GET list of reviews for a recipe
router.get('/:recipe', RecipeReviewController.listReviews);
//GET a review middlewares.checkAuthentication, 
router.get('/:recipe/:id', RecipeReviewController.getReview);

module.exports = router;