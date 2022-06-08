const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveFeaturesValidations, updateFeaturesValidation } = require('../validations/validation');
const Features = db.Features;
const crypto = require('crypto');
const logs = require('../controllers/logging.js');
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let feature = {};

    try {
        // Validate
        const { error } = saveFeaturesValidations(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        feature.name = req.body.name;
        feature.is_active = req.body.is_active;
        feature.icon = req.body.icon;
        feature.created_by = req.body.created_by;
        feature.uuid = crypto.randomUUID();

        // Save to PostgreSQL database
        Features.create(feature).then(result => {
            // saving logs to database
            logs("Features", "create", "Info", "Successfully Created a feature");
            // send uploading message to client
            res.status(200).json({
                message: "Successfully Created a feature",
                feature: successResponse(result),
            });
        });
    } catch (error) {
        // saving logs to database
        logs("Features", "create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.updateFeatures = async (req, res) => {

    try {
        // Validate
        const { error } = updateFeaturesValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let featureId = req.body.featureId;
        let feature = await Features.findByPk(featureId);

        if (!feature) {
            logs("Features", "updateFeatures", "Info", "Not Found for updating a feature with id = " + featureId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a feature with id = " + featureId,
                feature: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                featureId: req.body.featureId,
                name: req.body.name,
                is_active: req.body.is_active,
                icon: req.body.icon,
                updated_by: req.body.updated_by,
                updatedat: new Date()
            }
            let result = await feature.update(updatedObject, { returning: true, where: { featureId: featureId } });

            // return the response to client
            if (!result) {
                logs("Features", "updateFeatures", "Error", "Error -> Can not update a feature with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a feature with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("Features", "updateFeatures", "Error", "Update successfully a feature with id = " + featureId);
            res.status(200).json({
                message: "Update successfully a feature with id = " + featureId,
                feature: updatedObject,
            });


        }
    } catch (error) {
        logs("Features", "updateFeatures", "Error", error.message);
        res.status(500).json({
            message: "Error -> Can not update a feature with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getFeatures = (req, res) => {

    Features.findAll()
        .then(featureInfos => {
            // saving logs to database
            logs("Features", "getFeatures", "Info", "Get all feature' Infos Successfully!");
            res.status(200).json({
                message: "Get all feature' Infos Successfully!",
                feature: featureInfos
            });
        })
        .catch(error => {
            // log on console
            logs("Features", "getFeatures", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

exports.getFeaturesById = (req, res) => {
    let log = {};
    let featureId = req.params.id;
    Features.findByPk(featureId)
        .then(feature => {
            logs("Features", "getFeaturesById", "Info", "Successfully Get a feature with id = " + featureId);
            res.status(200).json({
                message: " Successfully Get a feature with id = " + featureId,
                feature: feature
            });
        })
        .catch(error => {
            // log on console
            logs("Features", "getFeaturesById", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let featureId = req.params.id;
        let feature = await Features.findByPk(featureId);
        if (!feature) {
            logs("Features", "create", "Info", "Not Found for Delete a feature with id = " + featureId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a feature with id = " + featureId,
                error: "404"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1",
            }
            let result = await Features.update(updatedObject, { returning: true, where: { featureId: featureId } });
            // return the response to client
            if (!result) {
                logs("Features", "deleteById", "Error", "Error -> Can not delete a feature with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a feature with id = " + req.params.id,
                    error: "Id not Exists",
                });
            }
            logs("Features", "deleteById", "Info", "delete successfully a feature with id = " + featureId);
            res.status(200).json({
                message: "delete successfully a feature with id = " + featureId
            });
        }
    } catch (error) {
        logs("Features", "deleteById", "Info", "Error -> Can not delete a feature with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a feature with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }
}