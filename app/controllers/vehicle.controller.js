const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveVehicleValidation, updateVehicleValidation } = require('../validations/validation');
const VoiceResponse = require('twilio/lib/twiml/VoiceResponse');
const Vehicle = db.Vehicle;
const Vehicle_to_Features = db.vehicle_to_features;
const Vehicle_to_Guidelines = db.vehicle_to_guidelines;
const crypto = require('crypto');
const logs = require('../controllers/logging.js');
const { count } = require('console');
//const Op = db.Sequelize.Op;

exports.create = async function (req, res) {
    let vehicle = {};
    let vehicle_to_features = {};
    let vehicle_to_guidelines = {};
    try {
        // Validate
        const { error } = saveVehicleValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        //vehicle.locationId = req.body.locationId;
        vehicle.plate_number = req.body.plate_number;
        vehicle.description = req.body.description;
        vehicle.seats = req.body.seats;
        vehicle.vehicle_type_id = req.body.vehicle_type_id;
        vehicle.green_vehicle_id = req.body.green_vehicle_id;
        vehicle.categoryId = req.body.categoryId;
        vehicle.transmissionId = req.body.transmissionId;
        vehicle.main_image = req.body.main_image;
        vehicle.price = req.body.price;
        vehicle.price_inc_driver = req.body.price_inc_driver;
        vehicle.uuid = crypto.randomUUID();
        vehicle.userId = req.body.userId;
        vehicle.modelId = req.body.modelId;
        vehicle.makeId = req.body.makeId;
        vehicle.created_by = req.body.userId;
        vehicle.createdAt = new Date();
        vehicle.cancel = "0";
        vehicle.Isfavourite = "0";
        vehicle.IsDeleted = "0";
        vehicle.availability_startdate = req.body.availability_startdate;
        vehicle.availability_enddate = req.body.availability_enddate;
        vehicle.chassis_number = req.body.chassis_number;
        vehicle.eco_friendly_Id = req.body.eco_friendly_Id;
        vehicle.additional_Price = req.body.additional_Price;
        vehicle.with_driver = req.body.with_driver;

        // Save to MySQL database
        const result = await Vehicle.create(vehicle);
        // send uploading message to client
        if (result.vehicleId != null) {
            var id = result.vehicleId;
            let guidelines = [];
            var val = req.body.guidelines;
            for (var i in val) {
                guidelines.push({ 'guidelineId': val[i].guidelineId, 'vehicleId': id });
                vehicle_to_guidelines.guidelineId = guidelines[i].guidelineId;
                vehicle_to_guidelines.vehicleId = guidelines[i].vehicleId;
                await Vehicle_to_Guidelines.create(vehicle_to_guidelines);
            }
        }

        if (result.vehicleId != null) {
            var obj = req.body.features;
            var id = result.vehicleId;
            let features = [];
            for (var i in obj) {
                features.push({ 'featureId': obj[i].featureId, 'vehicleId': id });
                vehicle_to_features.featureId = features[i].featureId;
                vehicle_to_features.vehicleId = features[i].vehicleId;
                await Vehicle_to_Features.create(vehicle_to_features);
            }
        }
        res.status(200).json({
            message: "Create Successfully a vehicle with id = " + result.vehicleId,
            vehicle: successResponse(result),
        });
    } catch (error) {
        logs("Vehicle", "create", "Info", error.message);
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
            logs("Vehicle", "updateVehicle", "Info", "Not Found for updating a vehicle with id = " + vehicleId);
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
                description: req.body.description,
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
                makeId: req.body.makeId,
                availability_startdate: req.body.availability_startdate,
                availability_enddate: req.body.availability_enddate,
                chassis_number: req.body.chassis_number,
                eco_friendly_Id: req.body.eco_friendly_Id,
                additional_Price: req.body.additional_Price,
                with_driver: req.body.with_driver,
            }
            let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });

            // return the response to client
            if (!result) {
                logs("Vehicle", "updateVehicle", "Error", "Error -> Can not update a vehicle with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a vehicle with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("Vehicle", "updateVehicle", "Error", "Update successfully a vehicle with id = " + vehicleId);
            res.status(200).json({
                message: "Update successfully a vehicle with id = " + vehicleId,
                vehicle: updatedObject,
            });
        }
    } catch (error) {
        logs("Vehicle", "updateVehicle", "Error", error.message);
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
            logs("Vehicle", "getVehicle", "Info", "Get all vehicle' Infos Successfully!");
            res.status(200).json({
                message: "Get all vehicle' Infos Successfully!",
                vehicle: vehicleInfos
            });
        })
        .catch(error => {
            // log on console
            logs("Vehicle", "getVehicle", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.getVehicleByFilters = (req, res, next) => {

    let statusId = req.body.statusId;
    var makeId = 0;
    var locationId = 0;
    var modelId = 0;
    var rating = 0;
    var vehicle_type_id = 0;
    var price_range1 = 0;
    var price_range2 = 0;
    var sorting = "";
    if (makeId < req.body.makeId) {
        makeId = req.body.makeId;
    } else {
        makeId = 0;
    }
    if (locationId < req.body.locationId) {
        locationId = req.body.locationId;
    } else {
        locationId = 0;
    }
    if (modelId < req.body.modelId) {
        modelId = req.body.modelId;
    } else {
        modelId = 0;
    }
    if (vehicle_type_id < req.body.vehicle_type_id) {
        vehicle_type_id = req.body.vehicle_type_id;
    } else {
        vehicle_type_id = 0;
    }
    if (rating < req.body.rating) {
        rating = req.body.rating;
    } else {
        rating = 0;
    }
    if (price_range1 < req.body.price_range1) {
        price_range1 = req.body.price_range1;
    } else {
        price_range1 = 0;
    }
    if (price_range2 < req.body.price_range2) {
        price_range2 = req.body.price_range2;
    } else {
        price_range2 = 0;
    }
    if (req.body.sorting != "") {
        sorting = req.body.sorting;
    } else {
        sorting = "ASC";
    }
    db.sequelize.query('CALL get_vehicles_by_filter(' + statusId + ',' + makeId + ',' + locationId + ',' + modelId + ',' + vehicle_type_id + ',' + rating + ',' + price_range1 + ',' + price_range2 + ',' + sorting + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("Vehicles", "getVehicleByFilters", "Info", "Get all filtered Lists Successfully! ");
            res.status(200).json({
                message: "Get all Vehicles Infos Successfully!",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            logs("Vehicles", "getVehicleByFilters", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.getVehicleDetails = (req, res, next) => {
    let bookingStatusId = req.body.statusId;
    let vehicleId = req.body.vehicleId;
    db.sequelize.query('CALL getVehicleDetail(' + bookingStatusId + ',' + vehicleId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("Vehicle", "getVehicleDetails", "Info", "Successfully Get a vehicle with id = " + vehicleId);
            res.status(200).json({
                message: "Get Vehicle Detail Page Successfully!",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            logs("Vehicle", "getVehicleDetails", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let vehicleId = req.params.id;
        let vehicle = await Vehicle.findByPk(vehicleId);
        if (!vehicle) {
            logs("Vehicle", "create", "Info", "Not Found for Delete a vehicle with id = " + vehicleId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a vehicle with id = " + vehicleId,
                error: "404"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1"
            }
            let result = await vehicle.update(updatedObject, { returning: true, where: { vehicleId: vehicleId } });
            // return the response to client
            if (!result) {
                logs("Vehicle", "deleteById", "Error", "Error -> Can not delete a vehicle with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a vehicle with id = " + req.params.id,
                    error: "Id not Exists",
                });
            }
            logs("Vehicle", "deleteById", "Info", "delete successfully a vehicle with id = " + vehicleId);
            res.status(200).json({
                message: "delete successfully a vehicle with id = " + vehicleId
            });
        }
    } catch (error) {
        logs("Vehicle", "deleteById", "Info", "Error -> Can not delete a vehicle with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a vehicle with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }
}

exports.IsFavourite = async (req, res) => {
    try {
        let vehicleId = req.body.vehicleId;
        let vehicle = await Vehicle.findByPk(vehicleId);
        if (!vehicle) {
            // return a response to client
            logs("Vehicle", "IsFavourite", "Info", "Vehicle Not Found with id = " + vehicleId);
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
                    logs("Vehicle", "IsFavourite", "Info", "Error -> vehicle Can not updated with id = " + req.params.id);
                    res.status(500).json({
                        message: "Error -> vehicle Can not updated with id = " + req.params.id,
                        error: "Can NOT Updated",
                    });
                }
                logs("Vehicle", "IsFavourite", "Info", "vehicle successfully updated with id = " + vehicleId);
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
                        logs("Vehicle", "IsFavourite", "Info", "Error -> vehicle Can not unfavourite with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> vehicle Can not unfavourite with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("Vehicle", "IsFavourite", "Info", "vehicle successfully unfavourite with id = " + vehicleId);
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
                        logs("Vehicle", "IsFavourite", "Info", "Error -> vehicle Can not Isfavourite with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> vehicle Can not Isfavourite with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("Vehicle", "IsFavourite", "Info", "vehicle successfully Isfavourite with id = " + vehicleId);
                    res.status(200).json({
                        message: "vehicle successfully Isfavourite with id = " + vehicleId,
                        Vehicle: updatedObject,
                    });
                }
            }
        }
    }
    catch (error) {
        logs("Vehicle", "IsFavourite", "Error", "Error -> Booking Can not be Reject  with id = " + req.params.id);
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
            logs("Vehicle", "CancelBooking", "Info", "Vehicle Not Found with id = " + vehicleId);
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
                    logs("Vehicle", "CancelBooking", "Info", "Error -> vehicle Can not updated with id = " + req.params.id);
                    res.status(500).json({
                        message: "Error -> vehicle Can not updated with id = " + req.params.id,
                        error: "Can NOT Updated",
                    });
                }
                logs("Vehicle", "CancelBooking", "Info", "vehicle successfully updated with id = " + vehicleId);
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
                        logs("Vehicle", "CancelBooking", "Info", "Error -> vehicle Can not IsCancel with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> vehicle Can not IsCancel with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("Vehicle", "CancelBooking", "Info", "vehicle successfully IsCancel with id = " + vehicleId);
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
                        logs("Vehicle", "CancelBooking", "Info", "Error -> vehicle Can not Cancel with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> vehicle Can not Cancel with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("Vehicle", "CancelBooking", "Info", "vehicle successfully Cancel with id = " + vehicleId);
                    res.status(200).json({
                        message: "vehicle successfully Cancel with id = " + vehicleId,
                        Vehicle: updatedObject,
                    });
                }
            }
        }
    }
    catch (error) {
        logs("Vehicle", "CancelBooking", "Error", "Error -> Vehicle Can not be Cancel  with id = " + req.params.id);
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
            logs("Vehicle", "getVehicleList", "Error", "Get all VehicleList Infos Successfully! ");
            res.status(200).json({
                message: "Get all VehicleList Infos Successfully! ",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            console.log(error);
            logs("Vehicle", "getVehicleList", "Error", error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getVehicleBySearch = (req, res, next) => {
    try {
        let locationId = req.body.locationId;
        db.sequelize.query('CALL get_vehiclebysearch (' + locationId + ',' + req.body.startdate + ',' + req.body.enddate + '); FETCH ALL FROM "rs_resultone";', res, next)
            .then(result => {
                logs("Vehicle", "getVehicleBySearch", "Error", "Get all VehicleSearch Infos Successfully! ")
                res.status(200).json({
                    message: "Get all getVehiclyeBySearch Infos Successfully! ",
                    results: { 'query': result[0], 'count': result[1][1].rowCount }
                });
            })
    }
    catch (error) {
        // log on console
        console.log(error);
        logs("Vehicle", "getVehicleBySearch", "Error", error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    };
}
exports.getVehicleById = (req, res, next) => {
    let vehicleId = req.body.vehicleId;
    db.sequelize.query('CALL get_vehiclebyid(' + vehicleId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("Vehicle", "getVehicleById", "Info", "Successfully Get a vehicle with id = " + vehicleId);
            res.status(200).json({
                message: "Get Vehicle Detail Page Successfully!",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            logs("Vehicle", "getVehicleById", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}