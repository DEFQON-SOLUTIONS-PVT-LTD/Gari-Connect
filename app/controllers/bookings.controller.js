const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveBookingsValidation, updateBookingsValidation } = require('../validations/validation');
const Bookings = db.Bookings;
const Vehicle = db.Vehicle;
const crypto = require('crypto');
const { date } = require('joi');
const { listeners } = require('process');
const { default: DateDiff } = require('date-diff');
const moment = require('moment');
const logs = require('../controllers/logging.js');
//const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    let booking = {};
    try {
        // Validate
        const { error } = saveBookingsValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        booking.vehicleId = req.body.vehicleId;
        booking.is_active = req.body.is_active;
        booking.userId = req.body.userId;
        booking.uuid = "ASDFF-" + Math.floor(Math.random() * 10000) + 1;
        booking.statusId = req.body.statusId;
        booking.createdAt = new Date();
        booking.trip_startDate = (req.body.trip_startDate);
        booking.trip_endDate = (req.body.trip_endDate);
        booking.isApproved = "0";
        booking.isReject = "0";
        booking.IsDeleted = "0";
        let vehicleid = req.body.vehicleId;
        let vehicle = await Vehicle.findByPk(vehicleid);
        let startDate = booking.trip_startDate;
        let endDate = booking.trip_endDate;
        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        if (vehicle != null) {
            const totalcost = vehicle.price * diffInDays;
            booking.cost = totalcost;
            const totaldrivercost = vehicle.price_inc_driver * totalcost;
            booking.driver_cost = totaldrivercost;
        }
        // Save to MySQL database
        Bookings.create(booking).then(result => {
            logs("Bookings", "create", "Info", "Create Successfully a booking with id = " + result.bookingId);
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a booking with id = " + result.bookingId,
                booking: successResponse(result),
            });
        });
    } catch (error) {
        logs("Bookings", "create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
exports.statusUpdate = async (req, res) => {
    try {
        // Validate
        const { error } = updateBookingsValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let bookingId = req.body.bookingId;
        let booking = await Bookings.findByPk(bookingId);
        if (!booking) {
            logs("Bookings", "create", "Info", "Not Found for updating a booking with id = " + bookingId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a booking with id = " + bookingId,
                booking: "",
                error: "404",
                type: "bookingId"
            });
        } else {
            // update new change to database
            let updatedObject = {
                bookingId: req.body.bookingId,
                statusId: req.body.statusId,
                updatedAt: new Date(),
            }
            let result = await booking.update(updatedObject, { returning: true, where: { bookingId: bookingId } });
            // return the response to client
            if (!result) {
                logs("Bookings", "statusUpdate", "Error", "Error -> Can not update a status with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a ststus with id = " + req.params.id,
                    error: "Can NOT Updated",
                    type: "bookingId"
                });
            }
            logs("Bookings", "statusUpdate", "Info", "Update successfully a status with id = " + bookingId);
            res.status(200).json({
                message: "Update successfully a status with id = " + bookingId
            });
        }
    } catch (error) {
        logs("Bookings", "statusUpdate", "Info", "Error -> Can not update a status with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a status with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
exports.getBooking = (req, res, next) => {
    let statusId = req.body.statusId;
    db.sequelize.query('CALL get_bookings(' + statusId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("Bookings", "getBooking", "Info", "Get all booking Infos Successfully! ");
            var arr = result[0];
            arr.splice(0, 1);
            res.status(200).json({
                message: "Get all booking Infos Successfully! ",
                result: arr,
            });
        })
        .catch(error => {
            // log on console
            logs("Bookings", "getBooking", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.getBookingById = (req, res, next) => {
    let bookingId = req.params.id;
    db.sequelize.query('CALL get_bookingbyid( ' + bookingId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            logs("Bookings", "getBookingById", "Info", "Successfully Get a booking with id = " + bookingId);
            var arr = result[0];
            arr.splice(0, 1);
            res.status(200).json({
                message: "Successfully Get a booking with id = " + bookingId,
                result: arr,
            });
        })
        .catch(error => {
            // log on console
            console.log(error);
            logs("Bookings", "getBookingById", "Info", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.deleteById = async (req, res) => {
    try {
        // Validate
        let bookingId = req.params.id;
        let booking = await Bookings.findByPk(bookingId);
        if (!booking) {
            logs("Bookings", "create", "Info", "Not Found for Deleting a booking with id = " + bookingId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a booking with id = " + bookingId,
                error: "404",
                type: "bookingId"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1"
            }
            let result = await booking.update(updatedObject, { returning: true, where: { bookingId: bookingId } });
            // return the response to client
            if (!result) {
                logs("Bookings", "deleteById", "Error", "Error -> Can not delete a booking with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a booking with id = " + req.params.id,
                    error: "Id not Exists",
                    type: "bookingId"
                });
            }
            logs("Bookings", "deleteById", "Info", "delete successfully a booking with id = " + bookingId);
            res.status(200).json({
                message: "delete successfully a booking with id = " + bookingId
            });
        }
    } catch (error) {
        logs("Bookings", "deleteById", "Info", "Error -> Can not delete a booking with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a booking with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
    // try {
    // await Bookings.destroy({
    // where: {
    // bookingId: req.params.id
    // }
    // });
    // logs("Bookings", "deleteById", "Info", "booking deleted");
    // res.json({
    // "message": "booking Deleted"
    // });
    // } catch (err) {
    // logs("Bookings", "deleteById", "Error", err);
    // }
}
exports.IsApproved = async (req, res) => {
    try {
        let bookingId = req.body.bookingId;
        let booking = await Bookings.findByPk(bookingId);
        if (!booking) {
            logs("Bookings", "IsApproved", "Info", "Booking Not Found with id = " + bookingId);
            // return a response to client
            res.status(404).json({
                message: "Booking Not Found with id = " + bookingId,
                booking: "",
                error: "404",
                type: "bookingId"
            });
        } else {
            // update new change to database
            let updatedObject = {
                bookingId: req.body.bookingId,
                isApproved: "1",
                isReject: "0"
            }
            let result = await booking.update(updatedObject, { returning: true, where: { bookingId: bookingId } });

            // return the response to client
            if (!result) {
                logs("Bookings", "IsApproved", "Error", "Error -> booking Can not Approved with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> booking Can not Approved with id = " + req.params.id,
                    error: "Can NOT Updated",
                    type: "bookingId"
                });
            }
            logs("Bookings", "IsApproved", "Info", "Booking successfully Approved with id = " + bookingId);
            res.status(200).json({
                message: "Booking successfully Approved with id = " + bookingId,
                booking: updatedObject,
            });
        }
    } catch (error) {
        logs("Bookings", "IsApproved", "Error", "Error -> Booking Can not  be Approved  with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Booking Can not  be Approved  with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
exports.IsReject = async (req, res) => {
    try {
        let bookingId = req.body.bookingId;
        let booking = await Bookings.findByPk(bookingId);
        if (!booking) {
            logs("Bookings", "IsReject", "Error", "Booking Not Found with id = " + bookingId);
            // return a response to client
            res.status(404).json({
                message: "Booking Not Found with id = " + bookingId,
                booking: "",
                error: "404",
                type: "bookingId"
            });
        } else {
            // update new change to database
            let updatedObject = {
                bookingId: req.body.bookingId,
                isApproved: "0",
                isReject: "1"
            }
            let result = await booking.update(updatedObject, { returning: true, where: { bookingId: bookingId } });

            // return the response to client
            if (!result) {
                logs("Bookings", "IsReject", "Error", "Booking Not Found with id = " + bookingId);
                res.status(500).json({
                    message: "Error -> booking Can not Reject with id = " + req.params.id,
                    error: "Can NOT Updated",
                    type: "bookingId"
                });
            }
            logs("Bookings", "IsReject", "Info", "Booking successfully Reject with id = " + bookingId);
            res.status(200).json({
                message: "Booking successfully Reject with id = " + bookingId,
                booking: updatedObject,
            });
        }
    } catch (error) {
        logs("Bookings", "IsReject", "Error", "Error -> Booking Can not be Reject  with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Booking Can not be Reject  with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

