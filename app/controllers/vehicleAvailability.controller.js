// Import model Product
const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveVehicleAvailabilityValidation, updateMakeValidation } = require('../validations/validation');
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