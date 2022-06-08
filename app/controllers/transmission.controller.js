const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveTransmissionValidation, updateTransmissionValidation } = require('../validations/validation');
const Transmission = db.Transmission;
const logs = require('../controllers/logging.js');
const crypto = require('crypto');

//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let transmission = {};

    try {
        // Validate
        const { error } = saveTransmissionValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        transmission.name = req.body.name;
        transmission.is_active = req.body.is_active;
        transmission.created_by = req.body.created_by;
        transmission.createdat = new Date();
        transmission.uuid = crypto.randomUUID();

        // Save to MySQL database
        Transmission.create(transmission).then(result => {
            logs("Transmission", "Create", "Info", "Successfully created transmission");
            // send uploading message to client
            res.status(200).json({
                message: "Successfully created transmission",
                transmission: successResponse(result),
            });
        });
    } catch (error) {
        logs("Transmission", "Create", "Info", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.updateTransmission = async (req, res) => {
    try {
        // Validate
        const { error } = updateTransmissionValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let transmissionId = req.body.transmissionId;
        let transmission = await Transmission.findByPk(transmissionId);

        if (!transmission) {
            logs("Transmission", "Create", "Info", "Not Found for updating a transmission with id = " + transmissionId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a transmission with id = " + transmissionId,
                transmission: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                transmissionId: req.body.transmissionId,
                name: req.body.name,
                is_active: req.body.is_active,
                updated_by: req.body.updated_by,
                updatedAt: new Date()
            }
            let result = await transmission.update(updatedObject, { returning: true, where: { transmissionId: transmissionId } });

            // return the response to client
            if (!result) {
                logs("Transmission", "updateTransmission", "Error", "Error -> Can not update a transmission with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a transmission with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("Transmission", "updateTransmission", "Info", "Update successfully a transmission with id = " + transmissionId);
            res.status(200).json({
                message: "Update successfully a transmission with id = " + transmissionId,
                transmission: updatedObject,
            });
        }
    } catch (error) {
        logs("Transmission", "updateTransmission", "Error", "Error -> Can not update a transmission with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a transmission with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getTransmission = (req, res) => {

    Transmission.findAll()
        .then(transmissionInfos => {
            logs("Transmission", "getTransmission", "Info", "Get all transmission' Infos Successfully!");
            res.status(200).json({
                message: "Get all transmission' Infos Successfully!",
                transmission: transmissionInfos
            });
        })
        .catch(error => {
            // log on console
            logs("Transmission", "getTransmission", "Info", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getTransmissionById = (req, res) => {
    let transmissionId = req.params.id;
    Transmission.findByPk(transmissionId)
        .then(transmission => {
            logs("Transmission", "getTransmissionById", "Info", "Successfully Get a transmission with id = " + transmissionId);
            res.status(200).json({
                message: "Successfully Get a transmission with id = " + transmissionId,
                transmission: transmission
            });
        })
        .catch(error => {
            // log on console
            logs("Transmission", "getTransmissionById", "Info", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let transmissionId = req.params.id;
        let transmission = await Transmission.findByPk(transmissionId);
        if (!transmission) {
            logs("Transmission", "create", "Info", "Not Found for Delete a transmission with id = " + transmissionId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a transmission with id = " + transmissionId,
                error: "404"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1"
            }
            let result = await transmission.update(updatedObject, { returning: true, where: { transmissionId: transmissionId } });
            // return the response to client
            if (!result) {
                logs("Transmission", "deleteById", "Error", "Error -> Can not transmission a model with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a transmission with id = " + req.params.id,
                    error: "Id not Exists",
                });
            }
            logs("Transmission", "deleteById", "Info", "delete successfully a transmission with id = " + transmissionId);
            res.status(200).json({
                message: "delete successfully a transmission with id = " + transmissionId
            });
        }
    } catch (error) {
        logs("Transmission", "deleteById", "Info", "Error -> Can not delete a transmission with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a transmission with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }
}