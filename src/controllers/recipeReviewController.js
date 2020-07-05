"use strict";

const RecipeReviewModel = require('../models/recipeReviewModel');
const { UserModel } = require('../models/userModel');



const listReviews = (req, res) => {
    RecipeReviewModel.find({ recipe: req.params.recipe })
        .populate('addedbyUser', '_id fullName')
        .populate('recipe', '_id title').exec()
        .then(reviews => res.status(200).json(reviews))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const getReview = (req, res) => {
    RecipeReviewModel.findOne({ _id: req.params.id }).populate('addedbyUser', '_id fullName')
        .populate('recipe', '_id title').exec()
        .then(review => res.status(200).json(review))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


const addReview = async (req, res) => {
    console.log(req.file);

    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body is empty'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'heading')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have heading property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'detail')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have detail property'
    });

    if (!req.body.addedbyUser) return res.status(400).json({
        error: 'Bad Request',
        message: 'Review must be added by Customer being logged in'
    });

    //const user = await UserModel.findOne({ _id: req.body.addedbyUser._id }).exec();

    if (!Object.prototype.hasOwnProperty.call(req.body, 'overallRating')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have overallRating property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'qualityRating')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have qualityRating property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'valueForMoneyRating')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have valueForMoneyRating property'
    });

    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    if (req.files) {
        for (var i = 0; i < req.files.length; i++) {
            reqFiles.push(url + '/public/uploads/reviews/' + req.files[i].filename)
        }
    }
    let review = {
        ...req.body,
        fileCollection: reqFiles
    };
    try {
        review = await RecipeReviewModel.create(review);
        review = await review.populate('addedbyUser', '_id fullName')
            .populate('recipe', '_id title').execPopulate();
        res.status(201).json({ message: review });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};


const editReview = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).json({
            error: 'Bad Request',
            message: 'Http request body is empty'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'heading')) return res.status(400).json({
            error: 'Bad Request',
            message: 'Http request body must have heading property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'detail')) return res.status(400).json({
            error: 'Bad Request',
            message: 'Http request body must have detail property'
        });

        if (!req.body.addedbyUser) return res.status(400).json({
            error: 'Bad Request',
            message: 'Review must be added by Customer being logged in'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'overallRating')) return res.status(400).json({
            error: 'Bad Request',
            message: 'Http request body must have overallRating property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'qualityRating')) return res.status(400).json({
            error: 'Bad Request',
            message: 'Http request body must have qualityRating property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'valueForMoneyRating')) return res.status(400).json({
            error: 'Bad Request',
            message: 'Http request body must have valueForMoneyRating property'
        });


        let review = await RecipeReviewModel.findOneAndUpdate({ _id: req.params.id },
            {
                heading: req.body.heading,
                detail: req.body.detail,
                overallRating: req.body.overallRating,
                qualityRating: req.body.qualityRating,
                valueForMoneyRating: req.body.valueForMoneyRating
            },
            { runValidators: true, new: true })
            .populate('addedbyUser', '_id fullName')
            .populate('recipe', '_id title').exec();
        if (!review) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Review not found.'
            });
        }
        res.status(200).json({ message: review });

    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error
        });
    }

}


module.exports = {
    listReviews,
    getReview,
    addReview,
    editReview
};
