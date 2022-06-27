const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveGuideLineValidation, updateGuideLineValidation } = require('../validations/validation');
const GuideLine = db.GuideLine;
const crypto = require('crypto');
const logs = require('../controllers/logging.js');
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let guideLine = {};

    try {
        // Validate
        const { error } = saveGuideLineValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        guideLine.name = req.body.name;
        guideLine.is_active = req.body.is_active;
        guideLine.created_by = req.body.created_by;
        guideLine.createdAt = new Date();
        guideLine.uuid = crypto.randomUUID();
        guideLine.icon = req.body.icon;
        guideLine.IsDeleted = "0";

        // Save to MySQL database
        GuideLine.create(guideLine).then(result => {
            // send uploading message to client
            logs("GuideLine", "Create", "Info", "Create Successfully a guideLine with id = " + result.id);
            res.status(200).json({
                message: "Successfully created a guideLine",
                guideLine: successResponse(result),
            });
        });
    } catch (error) {
        logs("GuideLine", "Create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.updateGuideLine = async (req, res) => {
    try {
        // Validate
        const { error } = updateGuideLineValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let guideLineId = req.body.guideLineId;
        let guideLine = await GuideLine.findByPk(guideLineId);

        if (!guideLine) {
            // return a response to client
            logs("GuideLine", "updateGuideLine", "Info", "Not Found for updating a guideLine with id = " + guideLineId);
            res.status(404).json({
                message: "Not Found for updating a guideLine with id = " + guideLineId,
                guideLine: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                GuideLineId: req.body.guideLineId,
                name: req.body.name,
                is_active: req.body.is_active,
                icon: req.body.icon,
                updated_by: req.body.updated_by,
                updatedAt: new Date()
            }
            let result = await guideLine.update(updatedObject, { returning: true, where: { guideLineId: guideLineId } });

            // return the response to client
            if (!result) {
                logs("GuideLine", "updateGuideLine", "Info", "Error -> Can not update a guideLine with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a guideLine with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("GuideLine", "updateGuideLine", "Info", "Update successfully a guideLine with id = " + guideLineId);
            res.status(200).json({
                message: "Update successfully a guideLine with id = " + guideLineId,
                guideLines: updatedObject,
            });
        }
    } catch (error) {
        logs("GuideLine", "updateGuideLine", "Error", "Error -> Can not update a guideline with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a guideline with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getGuideLine = (req, res) => {

    GuideLine.findAll()
        .then(guideLineInfos => {
            logs("GuideLine", "getGuideLine", "Info", "Get all guideLine' Infos Successfully!");
            res.status(200).json({
                message: "Get all guideLine' Infos Successfully!",
                guideLines: guideLineInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);
            logs("GuideLine", "getGuideLine", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getGuideLineById = (req, res) => {
    let guideLinedId = req.params.id;
    GuideLine.findByPk(guideLinedId)
        .then(guideLine => {
            logs("GuideLine", "getGuideLineById", "Error", "Successfully Get a guideLine with id = " + guideLinedId);
            res.status(200).json({
                message: "Successfully Get a guideLine with id = " + guideLinedId,
                guideLines: guideLine
            });
        })
        .catch(error => {
            // log on console
            logs("GuideLine", "getGuideLineById", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let guideLineId = req.params.id;
        let guideLine = await GuideLine.findByPk(guideLineId);
        if (!guideLine) {
            logs("GuideLine", "create", "Info", "Not Found for Delete a guideLine with id = " + guideLineId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a guideLine with id = " + guideLineId,
                error: "404"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1"
            }
            let result = await guideLine.update(updatedObject, { returning: true, where: { guideLineId: guideLineId } });
            // return the response to client
            if (!result) {
                logs("GuideLine", "deleteById", "Error", "Error -> Can not delete a guideLine with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a guideLine with id = " + req.params.id,
                    error: "Id not Exists",
                });
            }
            logs("GuideLine", "deleteById", "Info", "delete successfully a guideLine with id = " + guideLineId);
            res.status(200).json({
                message: "delete successfully a guideLine with id = " + guideLineId
            });
        }
    } catch (error) {
        logs("GuideLine", "deleteById", "Info", "Error -> Can not delete a guideLine with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a guideLine with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }
}
exports.getguidelineByVehicleId = (req, res, next) => {
    let vehicleId = req.params.id;
    db.sequelize.query('CALL get_guidelinesByVehicleId(' + vehicleId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("GuideLine", "getguidelineByVehicleId", "Info", "Successfully Get  guideline Details by vehicle with id = " + vehicleId);
            res.status(200).json({
                message: "Get guideline Details by vehicle Successfully!",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            logs("GuideLine", "getguidelineByVehicleId", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
