// Import model Product
const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveVehicleMandatoryFeaturesValidation, updateVehicleMandatoryFeaturesValidation } = require('../validations/validation');
const { date } = require('joi');
const VehicleMmandatoryFeatures = db.vehicle_mandatory_features;
const logs = require('../controllers/logging.js');
const crypto = require('crypto');
//const Op = db.Sequelize.Op;
// Create locations 
exports.create = (req, res) => {
    let vehicleMandatoryFeatures = {};
    try {
        // Validate
        const { error } = saveVehicleMandatoryFeaturesValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        vehicleMandatoryFeatures.fueltype = req.body.fueltype;
        vehicleMandatoryFeatures.kmpl = req.body.kmpl;
        vehicleMandatoryFeatures.doors = req.body.doors;
        vehicleMandatoryFeatures.seats = req.body.seats;
        vehicleMandatoryFeatures.vehicleId = req.body.vehicleId;
        // Save to MySQL database
        VehicleMmandatoryFeatures.create(vehicleMandatoryFeatures).then(result => {

            logs("vehicleMmandatoryFeatures", "Create", "Info", "Successfully created a VehicleMmandatoryFeatures");
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a VehicleMmandatoryFeatures =" + result.vehicle_mandatory_features_Id,
                EcoFriendly: successResponse(result),
            });
        });
    } catch (error) {
        logs("vehicleMmandatoryFeatures", "Create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
exports.getVehicleMandatoryFeaturesById = (req, res) => {
    let Id = req.params.id;
    VehicleMmandatoryFeatures.findByPk(Id)
        .then(vehicleMandatoryFeatures => {
            logs("Make", "getMakeById", "Info", "Successfully Get a Make with id = " + Id);
            res.status(200).json({
                message: " Successfully Get a Make with id = " + Id,
                VehicleMandatoryFeatures: vehicleMandatoryFeatures
            });
        })
        .catch(error => {
            // log on console
            logs("Make", "getMakeById", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}
exports.updateVehicleMandatoryFeaturesByVehicle = (req, res) => {
    try {
        // Validate
        const { error } = updateVehicleMandatoryFeaturesValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let VehicleId = req.body.vehicleId;
        VehicleMmandatoryFeatures.findOne({
            where: {
                vehicleId: req.body.vehicleId
            }
        })
            .then(vehicleMandatoryFeatures => {
                if (vehicleMandatoryFeatures == null) {
                    logs("vehicleMmandatoryFeatures", "updateVehicleMandatoryFeaturesByVehicle", "Info", "Not Found for updating a VehicleMmandatoryFeatures with id = " + VehicleId);
                    return res.status(404).send({ message: "Not Found for updating a location with id = " + VehicleId, });
                }
                else {
                    // update new change to database
                    let updatedObject = {
                        vehicleId: req.body.vehicleId,
                        fueltype: req.body.fueltype,
                        kmpl: req.body.kmpl,
                        doors: req.body.doors,
                        seats: req.body.seats,
                    }
                    let result = vehicleMandatoryFeatures.update(updatedObject, { returning: true, where: { vehicleId: VehicleId } });
                    // return the response to client
                    if (!result) {
                        logs("vehicleMmandatoryFeatures", "updateVehicleMandatoryFeaturesByVehicle", "Error", "Error -> Can not update a VehicleMmandatoryFeatures with id = " + req.params.id);
                        res.status(500).json({
                            message: "Error -> Can not update a VehicleMmandatoryFeatures with id = " + req.params.id,
                            error: "Can NOT Updated",
                        });
                    }
                    logs("vehicleMmandatoryFeatures", "updateVehicleMandatoryFeaturesByVehicle", "Info", "Update successfully a VehicleMmandatoryFeatures with id = " + VehicleId);
                    res.status(200).json({
                        message: "Update successfully a location with id = " + VehicleId,
                        location: updatedObject,
                    });
                }
            });
    }
    catch (error) {
        logs("location", "updateLocation", "Error", "Error -> Can not update a VehicleMmandatoryFeatures with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a VehicleMmandatoryFeatures with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

