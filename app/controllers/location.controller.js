// Import model Product
const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveLocationValidation, updateLocationValidation } = require('../validations/validation');
const { date } = require('joi');
const Location = db.locations;
const logs = require('../controllers/logging.js');
const crypto = require('crypto');
//const Op = db.Sequelize.Op;
// Create locations 
exports.create = (req, res) => {
    let location = {};

    try {
        // Validate
        const { error } = saveLocationValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        location.cityId = req.body.cityId;
        location.area = req.body.area;
        location.address = req.body.address;
        location.zip_code = req.body.zip_code;
        location.vehicleId = req.body.vehicleId;
        location.createdAt = new Date();
        location.IsDeleted = "0";

        // Save to MySQL database
        Location.create(location).then(result => {

            logs("location", "Create", "Info", "Successfully created a location");
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a location =" + result.locationId,
                location: successResponse(result),
            });
        });
    } catch (error) {
        logs("location", "Create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
exports.updateLocation = async (req, res) => {
    try {
        // Validate
        const { error } = updateLocationValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let locationId = req.body.locationId;
        let location = await Location.findByPk(locationId);

        if (!location) {
            logs("location", "updateLocation", "Info", "Not Found for updating a location with id = " + locationId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a location with id = " + locationId,
                location: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                locationId: req.body.locationId,
                cityId: req.body.cityId,
                area: req.body.area,
                address: req.body.address,
                zip_code: req.body.zip_code,
                vehicleId: req.body.vehicleId,
                updatedAt: new Date()
            }
            let result = await location.update(updatedObject, { returning: true, where: { locationId: locationId } });

            // return the response to client
            if (!result) {
                logs("location", "updateLocation", "Error", "Error -> Can not update a location with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a location with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("location", "updateLocation", "Info", "Update successfully a location with id = " + locationId);
            res.status(200).json({
                message: "Update successfully a location with id = " + locationId,
                location: updatedObject,
            });
        }
    } catch (error) {
        logs("location", "updateLocation", "Error", "Error -> Can not update a location with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a location with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
exports.getLocation = (req, res) => {

    Location.findAll()
        .then(locationInfos => {
            logs("location", "getLocation", "Info", "Get all locations' Infos Successfully!");
            res.status(200).json({
                message: "Get all locations' Infos Successfully!",
                location: locationInfos
            });
        })
        .catch(error => {
            // log on console
            logs("location", "getLocation", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}
exports.getLocationById = (req, res) => {
    let locationId = req.params.id;
    Location.findByPk(locationId)
        .then(location => {
            logs("location", "getLocationById", "Info", "Successfully Get a location with id = " + locationId);
            res.status(200).json({
                message: " Successfully Get a location with id = " + locationId,
                location: location
            });
        })
        .catch(error => {
            // log on console
            logs("location", "getLocationById", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let locationId = req.params.id;
        let location = await Location.findByPk(locationId);
        if (!location) {
            logs("location", "deleteById", "Info", "Not Found for Delete a location with id = " + locationId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a location with id = " + locationId,
                error: "404"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1"
            }
            let result = await location.update(updatedObject, { returning: true, where: { locationId: locationId } });
            // return the response to client
            if (!result) {
                logs("location", "deleteById", "Error", "Error -> Can not delete a location with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a location with id = " + req.params.id,
                    error: "Id not Exists",
                });
            }
            logs("location", "deleteById", "Info", "delete successfully a location with id = " + locationId);
            res.status(200).json({
                message: "delete successfully a location with id = " + locationId
            });
        }
    } catch (error) {
        logs("location", "deleteById", "Info", "Error -> Can not delete a location with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a location with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }

}
exports.getLocationByVehicleId = (req, res, next) => {
    let vehicleId = req.body.vehicleId;
    db.sequelize.query('CALL get_locationByVehicleId(' + vehicleId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("location", "getLocationByVehicleId", "Info", "Successfully Get  location Details by vehicle with id = " + vehicleId);
            res.status(200).json({
                message: "Get location Details by vehicle Successfully!",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            logs("location", "getLocationByVehicleId", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.updateLocationByVehicle = (req, res) => {
    try {
        // Validate
        const { error } = updateLocationValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let VehicleId = req.body.vehicleId;
        Location.findOne({
            where: {
                vehicleId: req.body.vehicleId
            }
        })
            .then(location => {
                if (location == null) {
                    logs("location", "updateLocation", "Info", "Not Found for updating a location with id = " + VehicleId);
                    return res.status(404).send({ message: "Not Found for updating a location with id = " + VehicleId, });
                }
                else {
                    // update new change to database
                    let updatedObject = {
                        vehicleId: req.body.vehicleId,
                        cityId: req.body.cityId,
                        area: req.body.area,
                        address: req.body.address,
                        zip_code: req.body.zip_code,
                        updatedAt: new Date()
                    }
                    let result = location.update(updatedObject, { returning: true, where: { vehicleId: VehicleId } });
                    // return the response to client
                    if (!result) {
                        logs("location", "updateLocation", "Error", "Error -> Can not update a location with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> Can not update a location with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("location", "updateLocation", "Info", "Update successfully a location with id = " + VehicleId);
                    res.status(200).json({
                        message: "Update successfully a location with id = " + VehicleId,
                        location: updatedObject,
                    });
                }
            });
    }
    catch (error) {
        logs("location", "updateLocation", "Error", "Error -> Can not update a location with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a location with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

