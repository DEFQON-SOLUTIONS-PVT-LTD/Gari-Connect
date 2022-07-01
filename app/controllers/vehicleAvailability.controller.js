// Import model Product
const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveVehicleAvailabilityValidation, updateVehicleAvailabilityValidation } = require('../validations/validation');
const { date } = require('joi');
const vehicleAvailability = db.vehicle_Availability;
const logs = require('../controllers/logging.js');
const crypto = require('crypto');
//const Op = db.Sequelize.Op;
// Create vehicle_availability 
exports.create = async function (req, res) {
    let vehicle_availability = {};
    try {
        // Validate
        const { error } = saveVehicleAvailabilityValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building vehicleAvailability object from upoading request's body
        var Id = req.body.vehicleId;
        let days = [];
        var val = req.body.days;
        for (var i in val) {
            days.push({ 'dayId': val[i].dayId, 'vehicleId': Id });
            vehicle_availability.dayid = days[i].dayId;
            vehicle_availability.vehicleid = days[i].vehicleId;
            const result = await vehicleAvailability.create(vehicle_availability);
            logs("vehicleAvailability", "Create", "Info", "Create Successfully a vehicleAvailability with id = " + result.vehicle_availability_id);
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a vehicleAvailability with id = " + result.vehicle_availability_id,
                vehicleAvailability: successResponse(result),
            });
        }
    } catch (error) {
        logs("vehicleAvailability", "Create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.getAvailabilityByVehicleId = (req, res, next) => {
    let vehicleId = req.params.id;
    db.sequelize.query('CALL get_availabilitybyvehicleid(' + vehicleId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("vehicleAvailability", "getAvailabilityByVehicleId", "Info", "Successfully Get  availability Details by vehicle with id = " + vehicleId);
            res.status(200).json({
                message: "Get availability Details by vehicle Successfully!",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            logs("vehicleAvailability", "getAvailabilityByVehicleId", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.updateAvailabilityByVehicle = async (req, res) => {
    let vehicle_availability = {};
    let VehicleId = req.body.vehicleId;
    let days = [];
    var val = req.body.days;
    try {
        // Validate
        const { error } = updateVehicleAvailabilityValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Save to MySQL database
        var result = await vehicleAvailability.destroy({
            where: {
                vehicleid: req.body.vehicleId
            }
        });

        if (result != null) {
            for (var i in val) {
                days.push({ 'dayId': val[i].dayId, 'vehicleId': VehicleId });
                vehicle_availability.dayid = days[i].dayId;
                vehicle_availability.vehicleid = days[i].vehicleId;
                const data = await vehicleAvailability.create(vehicle_availability);

            }
            logs("vehicleAvailability", "updateAvailabilityByVehicle", "Info", "Update successfully a vehicleAvailability with id = " + VehicleId);
            res.status(200).json({
                message: "Update successfully a vehicleAvailability with id = " + VehicleId,
                // vehicleAvailability: successResponse(data),
            });
        }
    }
    catch (error) {
        logs("vehicleAvailability", "updateAvailabilityByVehicle", "Error", "Error -> Can not update a vehicleAvailability with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a vehicleAvailability with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }

}

