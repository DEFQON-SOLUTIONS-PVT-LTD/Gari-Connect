const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveVehicleReviewsValidation } = require('../validations/validation');
const VehicleReviews = db.vehicle_reviews;
const logs = require('../controllers/logging.js');

//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let vehicleReview = {};

    try {
        // Validate
        const { error } = saveVehicleReviewsValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        vehicleReview.rating = req.body.rating;
        vehicleReview.is_active = req.body.is_active;
        vehicleReview.vehicleId = req.body.vehicleId;
        vehicleReview.created_by = req.body.created_by;
        vehicleReview.createdAt = new Date();
        vehicleReview.IsDeleted = "0";

        // Save to MySQL database
        VehicleReviews.create(vehicleReview).then(result => {
            logs("vehicleReview", "create", "Info", "Create Successfully a vehicleReview with id = " + result.vehicle_review_id);
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a vehicleReview with id = " + result.vehicle_review_id,
                vehicleReview: successResponse(result),
            });
        });
    } catch (error) {
        logs("vehicleReview", "create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}