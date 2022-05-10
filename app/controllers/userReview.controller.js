const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveUserReviewValidation, updateUserReviewValidation } = require('../validations/validation');
const UserReviews = db.UserReviews;
const crypto = require('crypto');
const logs = require('../controllers/logging.js');

//const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    let review = {};
    try {
        // Validate
        const { error } = saveUserReviewValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body

        review.rating = req.body.rating;
        review.feedback = req.body.feedback;
        review.created_on = new Date();
        review.is_active = req.body.is_active;
        review.userId = req.body.userId;
        review.uuid = crypto.randomUUID();

        // Save to MySQL database
        UserReviews.create(review).then(result => {
            // send uploading message to client
            logs("UserReviews","create","Info", "Successfully Created a Review");
            res.status(200).json({
                message: "Successfully Created a Review",
                review: successResponse(result),
            });
        });
    } catch (error) {
        logs("UserReviews","create","Info", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
};

exports.updateUserReview = async (req, res) => {
    try {
        // Validate
        const { error } = updateUserReviewValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));

        let user_review_id = req.body.user_review_id;
        let userReview = await UserReviews.findByPk(user_review_id);

        if (!userReview) {
            // return a response to client
            logs("UserReview","updateUserReview","Info", "Not Found for updating a user review with id = " + user_review_id);
            res.status(404).json({
                message: "Not Found for updating a user review with id = " + user_review_id,
                review: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                user_review_id: req.body.user_review_id,
                rating: req.body.rating,
                feedback: req.body.feedback,
            }
            let result = await userReview.update(updatedObject, { returning: true, where: { user_review_id: user_review_id } });

            // return the response to client
            if (!result) {
                logs("UserReview","updateUserReview","Info", "Error -> Can not update a user review with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a user review with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("UserReview","updateUserReview","Info", "Update successfully a user review with id = " + user_review_id);
            res.status(200).json({
                message: "Update successfully a user review with id = " + user_review_id,
                userReview: updatedObject,
            });
        }
    } catch (error) {
        logs("UserReview","updateUserReview","Error", "Error -> Can not update a user review with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a user review with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getUserReviews = (req, res) => {

    UserReviews.findAll()
        .then(result => {
            logs("UserReview","getUserReviews","Error", "Get all user reviews Successfully");
            res.status(200).json({
                message: "Get all user reviews Successfully",
                reviews: result
            });
        })
        .catch(err => {
            logs("UserReview","getUserReviews","Error", err);
            res.status(500).json({
                message: "Error has occurred!",
                error: err
            });
        });
};

exports.getUserReviewById = (req, res) => {
    let user_review_id = req.params.id;
    UserReviews.findByPk(user_review_id)
        .then(result => {
            logs("UserReview","getUserReviewById","Info", "Successfully got user review with id = " + user_review_id);
            res.status(200).json({
                message: "Successfully got user review with id = " + user_review_id,
                review: result
            });
        })
        .catch(err => {
            logs("UserReview","getUserReviewById","Error", err);
            res.status(500).json({
                message: "Error has occurred!",
                error: err
            })
        });
};

exports.deleteReviewById = async (req, res) => {
    try {
        await UserReviews.destroy({
            where: {
                user_review_id: req.params.id
            }
        });
        logs("UserReview","deleteReviewById","Info", "Review deleted");
        res.json({
            message: "Review deleted"
        });
    } catch (err) {
        logs("UserReview","deleteReviewById","Error", err);
    }
}