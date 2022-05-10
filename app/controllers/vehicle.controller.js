const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveVehicleValidation, updateVehicleValidation } = require('../validations/validation');
const VoiceResponse = require('twilio/lib/twiml/VoiceResponse');
const Vehicle = db.Vehicle;
const crypto = require('crypto');
const logs = require('../controllers/logging.js');
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let vehicle = {};

    try {
        // Validate
        const { error } = saveVehicleValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        vehicle.locationId = req.body.locationId;
        vehicle.plate_number = req.body.plate_number;
        vehicle.seats = req.body.seats;
        vehicle.vehicle_type_id = req.body.vehicle_type_id;
        vehicle.green_vehicle_id = req.body.green_vehicle_id;
        vehicle.categoryId = req.body.categoryId;
        vehicle.transmissionId = req.body.transmissionId;
        vehicle.featureId = req.body.featureId;
        vehicle.main_image = req.body.main_image;
        vehicle.price = req.body.price;
        vehicle.price_inc_driver = req.body.price_inc_driver;
        vehicle.guidelineId = req.body.guidelineId;
        vehicle.uuid = crypto.randomUUID();
        vehicle.userId = req.body.userId;
        vehicle.modelId = req.body.modelId;
        vehicle.makeId = req.body.makeId;
        vehicle.created_by = req.body.userId;
        vehicle.createdAt = new Date();
        vehicle.cancel = req.body.cancel;
        // Save to MySQL database
        Vehicle.create(vehicle).then(result => {
            // send uploading message to client
            logs("Vehicle","create","Info", "Create Successfully a vehicle with id = " + result.id);
            res.status(200).json({
                message: "Create Successfully a vehicle with id = " + result.id,
                vehicle: successResponse(result),
            });
        });
    } catch (error) {
        logs("Vehicle","create","Info", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.updateVehicle = async (req, res) => {
    try {
        // Validate
        const { error } = updateVehicleValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let vehicleId = req.body.vehicleId;
        let vehicle = await Vehicle.findByPk(vehicleId);

        if (!vehicle) {
            // return a response to client
            logs("Vehicle","updateVehicle","Info", "Not Found for updating a vehicle with id = " + vehicleId);
            res.status(404).json({
                message: "Not Found for updating a vehicle with id = " + vehicleId,
                vehicle: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                vehicleId: req.body.vehicleId,
                locationId: req.body.locationId,
                plate_number: req.body.plate_number,
                seats: req.body.seats,
                vehicle_type_id: req.body.vehicle_type_id,
                green_vehicle_id: req.body.green_vehicle_id,
                categoryId: req.body.categoryId,
                transmissionId: req.body.transmissionId,
                featureId: req.body.featureId,
                main_image: req.body.main_image,
                price: req.body.price,
                price_inc_driver: req.body.price_inc_driver,
                guidelineid: req.body.guidelineId,
                userId: req.body.userId,
                updated_by: req.body.userId,
                modelId: req.body.modelId,
                updatedat: new Date(),
                makeId: req.body.makeId
            }
            let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });

            // return the response to client
            if (!result) {
                logs("Vehicle","updateVehicle","Error", "Error -> Can not update a vehicle with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a vehicle with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("Vehicle","updateVehicle","Error", "Update successfully a vehicle with id = " + vehicleId);
            res.status(200).json({
                message: "Update successfully a vehicle with id = " + vehicleId,
                vehicle: updatedObject,
            });
        }
    } catch (error) {
        logs("Vehicle","updateVehicle","Error", error.message);
        res.status(500).json({
            message: "Error -> Can not update a vehicle with id = " + req.params.id,
            // error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getVehicle = (req, res) => {

    Vehicle.findAll()
        .then(vehicleInfos => {
            logs("Vehicle","getVehicle","Info", "Get all vehicle' Infos Successfully!");
            res.status(200).json({
                message: "Get all vehicle' Infos Successfully!",
                vehicle: vehicleInfos
            });
        })
        .catch(error => {
            // log on console
            logs("Vehicle","getVehicle","Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getVehicleById = (req, res) => {
    let vehicleId = req.params.id;
    Vehicle.findByPk(vehicleId)
        .then(vehicle => {
            logs("Vehicle","getVehicleById","Info", "Successfully Get a vehicle with id = " + vehicleId);
            res.status(200).json({
                message: " Successfully Get a vehicle with id = " + vehicleId,
                vehicles: vehicle
            });
        })
        .catch(error => {
            // log on console
            logs("Vehicle","getVehicleById","Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        await Vehicle.destroy({
            where: {
                vehicleId: req.params.id
            }
        });
        logs("Vehicle","getVehicleById","Info", "vehicle Deleted");
        res.json({
            "message": "vehicle Deleted"
        });
    } catch (err) {
        logs("Vehicle","getVehicleById","Error", err);
    }
}

exports.IsFavourite = async (req, res) => {
    try {
        let vehicleId = req.body.vehicleId;
        let vehicle = await Vehicle.findByPk(vehicleId);
        if (!vehicle) {
            // return a response to client
            logs("Vehicle","IsFavourite","Info", "Vehicle Not Found with id = " + vehicleId);
            res.status(404).json({
                message: "Vehicle Not Found with id = " + vehicleId,
                vehicle: "",
                error: "404"
            });
        } else {
            // update new change to database
            if (vehicle.Isfavourite == null) {
                let updatedObject = {
                    vehicleId: req.body.vehicleId,
                    Isfavourite: req.body.Isfavourite
                }
                let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });
                // return the response to client
                if (!result) {
                    logs("Vehicle","IsFavourite","Info", "Error -> vehicle Can not updated with id = " + req.params.id);
                    res.status(500).json({
                        message: "Error -> vehicle Can not updated with id = " + req.params.id,
                        error: "Can NOT Updated",
                    });
                }
                logs("Vehicle","IsFavourite","Info", "vehicle successfully updated with id = " + vehicleId);
                res.status(200).json({
                    message: "vehicle successfully updated with id = " + vehicleId,
                    Vehicle: updatedObject,
                });
            }
            else {
                if (vehicle.Isfavourite == true) {
                    let updatedObject = {
                        vehicleId: req.body.vehicleId,
                        Isfavourite: "0"
                    }
                    let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });
                    if (!result) {
                        logs("Vehicle","IsFavourite","Info", "Error -> vehicle Can not unfavourite with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> vehicle Can not unfavourite with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("Vehicle","IsFavourite","Info", "vehicle successfully unfavourite with id = " + vehicleId);
                    res.status(200).json({
                        message: "vehicle successfully unfavourite with id = " + vehicleId,
                        Vehicle: updatedObject,
                    });
                }

                else {
                    let updatedObject = {
                        vehicleId: req.body.vehicleId,
                        Isfavourite: "1"
                    }
                    let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });
                    if (!result) {
                        logs("Vehicle","IsFavourite","Info", "Error -> vehicle Can not Isfavourite with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> vehicle Can not Isfavourite with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("Vehicle","IsFavourite","Info", "vehicle successfully Isfavourite with id = " + vehicleId);
                    res.status(200).json({
                        message: "vehicle successfully Isfavourite with id = " + vehicleId,
                        Vehicle: updatedObject,
                    });
                }
            }
        }
    }
    catch (error) {
        logs("Vehicle","IsFavourite","Error", "Error -> Booking Can not be Reject  with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Booking Can not be Reject  with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
exports.CancelBooking = async (req, res) => {
    try {
        let vehicleId = req.body.vehicleId;
        let vehicle = await Vehicle.findByPk(vehicleId);
        if (!vehicle) {
            // return a response to client
            logs("Vehicle","CancelBooking","Info", "Vehicle Not Found with id = " + vehicleId);
            res.status(404).json({
                message: "Vehicle Not Found with id = " + vehicleId,
                vehicle: "",
                error: "404"
            });
        } else {
            // update new change to database
            if (vehicle.cancel == null) {
                let updatedObject = {
                    vehicleId: req.body.vehicleId,
                    cancel: req.body.cancel
                }
                let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });
                // return the response to client
                if (!result) {
                    logs("Vehicle","CancelBooking","Info", "Error -> vehicle Can not updated with id = " + req.params.id);
                    res.status(500).json({
                        message: "Error -> vehicle Can not updated with id = " + req.params.id,
                        error: "Can NOT Updated",
                    });
                }
                logs("Vehicle","CancelBooking","Info", "vehicle successfully updated with id = " + vehicleId);
                res.status(200).json({
                    message: "vehicle successfully updated with id = " + vehicleId,
                    Vehicle: updatedObject,
                });
            }
            else {
                if (vehicle.cancel == true) {
                    let updatedObject = {
                        vehicleId: req.body.vehicleId,
                        cancel: "0"
                    }
                    let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });
                    if (!result) {
                        logs("Vehicle","CancelBooking","Info", "Error -> vehicle Can not IsCancel with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> vehicle Can not IsCancel with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("Vehicle","CancelBooking","Info", "vehicle successfully IsCancel with id = " + vehicleId);
                    res.status(200).json({
                        message: "vehicle successfully IsCancel with id = " + vehicleId,
                        Vehicle: updatedObject,
                    });
                }

                else {
                    let updatedObject = {
                        vehicleId: req.body.vehicleId,
                        cancel: "1"
                    }
                    let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });
                    if (!result) {
                        logs("Vehicle","CancelBooking","Info", "Error -> vehicle Can not Cancel with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> vehicle Can not Cancel with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("Vehicle","CancelBooking","Info", "vehicle successfully Cancel with id = " + vehicleId);
                    res.status(200).json({
                        message: "vehicle successfully Cancel with id = " + vehicleId,
                        Vehicle: updatedObject,
                    });
                }
            }
        }
    }
    catch (error) {
        logs("Vehicle","CancelBooking","Error", "Error -> Vehicle Can not be Cancel  with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Vehicle Can not be Cancel  with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
exports.getVehicleList = (req, res, next) => {
    db.sequelize.query('CALL get_vehicleList(); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("Vehicle","CancelBooking","Error", "Get all VehicleList Infos Successfully! ");
            res.status(200).json({
                message: "Get all VehicleList Infos Successfully! ",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            console.log(error);
            logs("Vehicle","CancelBooking","Error", error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}