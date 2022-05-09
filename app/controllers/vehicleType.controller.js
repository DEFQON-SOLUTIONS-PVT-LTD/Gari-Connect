const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveVehicleTypeValidations, updateVehicleTypeValidation } = require('../validations/validation');
const VehicleType = db.VehicleType;
const logs = require('../controllers/logging.js');

//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let vehicletype = {};

    try {
        // Validate
        const { error } = saveVehicleTypeValidations(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        vehicletype.name = req.body.name;
        vehicletype.is_active = req.body.is_active;
        vehicletype.created_by = req.body.created_by;
        vehicletype.createdAt = new Date();

        // Save to MySQL database
        VehicleType.create(vehicletype).then(result => {
            logs("VehicleType","create","Info", "Create Successfully a VehicleType with id = " + result.id);
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a VehicleType with id = " + result.id,
                vehicletype: successResponse(result),
            });
        });
    } catch (error) {
        logs("VehicleType","create","Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.updateVehicleType = async (req, res) => {
    try {
        // Validate
        const { error } = updateVehicleTypeValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let vehicle_type_id = req.body.vehicle_type_id;
        let vehicletype = await VehicleType.findByPk(vehicle_type_id);

        if (!vehicletype) {
            // return a response to client
            logs("VehicleType","updateVehicleType","Info", "Not Found for updating a vehicletype with id = " + vehicle_type_id);
            res.status(404).json({
                message: "Not Found for updating a vehicletype with id = " + vehicle_type_id,
                vehicletype: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                vehicle_type_id: req.body.vehicle_type_id,
                name: req.body.name,
                is_active: req.body.is_active,
                updated_by: req.body.updated_by,
                updatedAt: new Date()
            }
            let result = await vehicletype.update(updatedObject, { returning: true, where: { vehicle_type_id: vehicle_type_id } });

            // return the response to client
            if (!result) {
                logs("VehicleType","updateVehicleType","Info", "Error -> Can not update a vehicletype with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a vehicletype with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("VehicleType","updateVehicleType","Info", "Update successfully a vehicletype with id = " + vehicle_type_id);
            res.status(200).json({
                message: "Update successfully a vehicletype with id = " + vehicle_type_id,
                vehicletype: updatedObject,
            });
        }
    } catch (error) {
        logs("VehicleType","updateVehicleType","Error", "Error -> Can not update a vehicletype with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a vehicletype with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getVehicleType = (req, res) => {

    VehicleType.findAll()
        .then(vehicletypeInfos => {
            logs("VehicleType","getVehicleType","Info", "Get all vehicletype' Infos Successfully!");
            res.status(200).json({
                message: "Get all vehicletype' Infos Successfully!",
                vehicletype: vehicletypeInfos
            });
        })
        .catch(error => {
            // log on console
            logs("VehicleType","getVehicleType","Error", error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getvehicletypeById = (req, res) => {
    let vehicle_type_id = req.params.id;
    VehicleType.findByPk(vehicle_type_id)
        .then(vehicletype => {
            logs("VehicleType","getvehicletypeById","Info", "Successfully Get a vehicletype with id = " + vehicle_type_id);
            res.status(200).json({
                message: " Successfully Get a vehicletype with id = " + vehicle_type_id,
                vehicletype: vehicletype
            });
        })
        .catch(error => {
            // log on console
            logs("VehicleType","getvehicletypeById","Error", error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        await VehicleType.destroy({
            where: {
                vehicle_type_id: req.params.id
            }
        });
        logs("VehicleType","deleteById","Info", "VehicleType Deleted");
        res.json({
            "message": "VehicleType Deleted"
        });
    } catch (err) {
        logs("VehicleType","deleteById","Error", err);
    }
}