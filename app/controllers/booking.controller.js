const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveBookingValidations, updateBookingValidation } = require('../validations/validation');
const { date } = require('joi');
const Booking = db.Bookings;

exports.create = (req, res) => {
    let booking = {};

    try {
        // Validate
        //const { error } = saveBookingValidations(req.body);
        // (error) return res.status(400).send(errorResponse(error.details[0].message, {})
        // Building model object from upoading request's body
        booking.userid = req.body.userId;
        booking.vehicleid = req.body.vehicleiId;
        booking.isactive = req.body.isactive;
        booking.createdon = req.body.createdon;
        booking.statusid = req.body.statusid;
        booking.createdat = new date();

        // Save to MySQL database
        Booking.create(booking).then(result => {
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a booking with id = " + result.id,
                category: successResponse(result),
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
exports.getBooking = (req, res, next) => {
    try {
        db.sequelize.query('CALL get_bookings(); FETCH ALL FROM  "rs_resultone";', res, next)
            .then(result => {
                res.status(200).json({
                    message: "Get all booking Infos Successfully!",
                   // statusCode: 200,
                    result: result[0],
                });
            })
    }
    catch (error) {
        // log on console
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    };
}
exports.getBookingById = (req, res, next) => {
    let bookingId = req.params.id;
    db.query('CALL getbookigbyid();', bookingId, res, next)
        .then(result => {
            res.status(200).json({
                message: " Successfully Get a booking with id = " + bookingId,
                result: result,
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


// exports.getBooking = (req, res) => {

// Booking.findAll()
// .then(bookingInfos => {
// res.status(200).json({
// message: "Get all booking' Infos Successfully!",
// booking: bookingInfos
// });
// })
// .catch(error => {
// // log on console
// console.log(error);

// res.status(500).json({
// message: "Error!",
// error: error
// });
// });
//}

// exports.getBookingById = (req, res) => {
    // let bookingId = req.params.id;
    // Booking.findByPk(bookingId)
        // .then(booking => {
            // res.status(200).json({
                // message: " Successfully Get a booking with id = " + bookingId,
                // booking: booking
            // });
        // })
        // .catch(error => {
            // // log on console
            // console.log(error);

            // res.status(500).json({
                // message: "Error!",
                // error: error
            // });
        // });
// }
