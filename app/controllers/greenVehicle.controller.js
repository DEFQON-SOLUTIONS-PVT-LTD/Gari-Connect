const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveGreenVehicleValidation, updateGreenVehicleValidation } = require('../validations/validation');
const GreenVehicle = db.GreenVehicle;
const crypto = require('crypto');
const logs = require('../controllers/logging.js');
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let greenvehicle = {};

    try {
        // Validate
        const { error } = saveGreenVehicleValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        greenvehicle.name = req.body.name;
        greenvehicle.is_active = req.body.is_active;
        greenvehicle.created_by = req.body.created_by;
        greenvehicle.createdAt = new Date()
        greenvehicle.uuid = crypto.randomUUID();

        // Save to MySQL database
        GreenVehicle.create(greenvehicle).then(result => {
            // send uploading message to client
            logs("GreenVehicle","Create","Info", "Create Successfully a greenVehicle with id = " + result.id);
            res.status(200).json({
                message: "Create Successfully a greenVehicle with id = " + result.id,
                greenvehicle: successResponse(result),
            });
        });
    } catch (error) {
        logs("GreenVehicle","Create","Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.updateGreenVehicle = async (req, res) => {
    try {
        // Validate
        const { error } = updateGreenVehicleValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let greenVehicleId = req.body.greenVehicleId;
        let greenVehicle = await GreenVehicle.findByPk(greenVehicleId);

        if (!greenVehicle) {
            // return a response to client
            logs("GreenVehicle","updateGreenVehicle","Info", "Not Found for updating a greenVehicle with id = " + greenVehicleId);
            res.status(404).json({
                message: "Not Found for updating a greenVehicle with id = " + greenVehicleId,
                greenVehicle: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                greenVehicleId: req.body.greenVehicleId,
                name: req.body.name,
                is_active: req.body.is_active,
                updated_by: req.body.updated_by,
                updatedAt: new Date()
            }
            let result = await greenVehicle.update(updatedObject, { returning: true, where: { greenVehicleId: greenVehicleId } });

            // return the response to client
            if (!result) {
                logs("GreenVehicle","updateGreenVehicle","Error", "Error -> Can not update a GreenVehicle with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a GreenVehicle with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("GreenVehicle","updateGreenVehicle","Info", "Update successfully a greenVehicle with id = " + greenVehicleId);
            res.status(200).json({
                message: "Update successfully a greenVehicle with id = " + greenVehicleId,
                greenVehicles: updatedObject,
            });
        }
    } catch (error) {
        logs("GreenVehicle","updateGreenVehicle","Error", "Error -> Can not update a greenVehicle with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a greenVehicle with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getGreenVehicle = (req, res) => {

    GreenVehicle.findAll()
        .then(greenvehicleInfos => {
            logs("GreenVehicle","getGreenVehicle","Info", "Get all greenVehicle' Infos Successfully!");
            res.status(200).json({
                message: "Get all greenVehicle' Infos Successfully!",
                greenVehicles: greenvehicleInfos
            });
        })
        .catch(error => {
            // log on console
            logs("GreenVehicle","getGreenVehicle","Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getGreenVehicleById = (req, res) => {
    let greenVehicleId = req.params.id;
    GreenVehicle.findByPk(greenVehicleId)
        .then(greenVehicle => {
            logs("GreenVehicle","getGreenVehicleById","Info", "Successfully Get a greenVehicle with id = " + greenVehicleId);
            res.status(200).json({
                message: "Successfully Get a greenVehicle with id = " + greenVehicleId,
                greenVehicles: greenVehicle
            });
        })
        .catch(error => {
            // log on console
            logs("GreenVehicle","getGreenVehicleById","Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        await GreenVehicle.destroy({
            where: {
                green_vehicle_id: req.params.id
            }
        });
        logs("GreenVehicle","getGreenVehicleById","Info", "GreenVehicle Deleted");
        res.json({
            "message": "GreenVehicle Deleted"
        });
    } catch (err) {
        logs("GreenVehicle","getGreenVehicleById","Info", err);
    }
}