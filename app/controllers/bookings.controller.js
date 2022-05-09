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
        booking.uuid = crypto.randomUUID();
        booking.statusId = req.body.statusId;
        booking.createdAt = new Date();
        booking.trip_startDate = (req.body.trip_startDate);
        booking.trip_endDate = (req.body.trip_endDate);
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
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a booking with id = " + result.id,
                booking: successResponse(result),
            });
        });
    } catch (error) {
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
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a booking with id = " + bookingId,
                booking: "",
                error: "404"
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
                res.status(500).json({
                    message: "Error -> Can not update a vehicletype with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            res.status(200).json({
                message: "Update successfully a vehicletype with id = " + bookingId,
                booking: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a vehicletype with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
exports.getBooking = (req, res, next) => {
    let statusId = req.body.statusId;
    db.sequelize.query('CALL get_bookings(' + statusId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            res.status(200).json({
                message: " Get all booking Infos Successfully! ",
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.getBookingById = (req, res, next) => {
    let bookingId = req.body.bookingId;
    db.sequelize.query('CALL get_bookingbyid( ' + bookingId + '); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            res.status(200).json({
                message: " Successfully Get a booking with id = " + bookingId,
                result: result[0],
            });
        })
        .catch(error => {
            // log on console
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
exports.deleteById = async (req, res) => {
    try {
        await Bookings.destroy({
            where: {
                bookingId: req.params.id
            }
        });
        res.json({
            "message": "booking Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}
exports.IsApproved = async (req, res) => {
    try {
        let bookingId = req.body.bookingId;
        let booking = await Bookings.findByPk(bookingId);
        if (!booking) {
            // return a response to client
            res.status(404).json({
                message: "Booking Not Found with id = " + bookingId,
                booking: "",
                error: "404"
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
                res.status(500).json({
                    message: "Error -> booking Can not Approved with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Booking successfully Approved with id = " + bookingId,
                booking: updatedObject,
            });
        }
    } catch (error) {
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
            // return a response to client
            res.status(404).json({
                message: "Booking Not Found with id = " + bookingId,
                booking: "",
                error: "404"
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
                res.status(500).json({
                    message: "Error -> booking Can not Reject with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Booking successfully Reject with id = " + bookingId,
                booking: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Booking Can not be Reject  with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

