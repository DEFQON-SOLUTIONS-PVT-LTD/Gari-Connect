// Import model Product
const db = require('../config/db.config.js');
const env = require('../config/env.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveSubscriberValidation } = require('../validations/validation');
const { date } = require('joi');
const Subscriber = db.Subscribers;
const logs = require('./logging.js');
const nodemailer = require("nodemailer");
//const Op = db.Sequelize.Op;
// Create support 
exports.create =  (req, res) => {
    let subscriber = {};
    try {
        // Validate
        const { error } = saveSubscriberValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));

        let checkSubscriber = Subscriber.findOne({ where: {email: req.body.email} }).then(function(subscriber_row) {
            if (checkSubscriber) {
                  if(subscriber_row!=null){
                    res.status(400).json({
                        subsc: errorResponse("You have already subscribed at GariConnect"),
                    });
              }else{
                subscriber.email = req.body.email;
                subscriber.createdAt = new Date();
                Subscriber.create(subscriber).then(result => {
                    // send uploading message to client
                    logs("Subscriber","Create","Info", "User subscribed successfully");
                    var smtpTr = nodemailer.createTransport({
                        host: env.SMTP_HOSTNAME_TEST,
                        port: env.SMTP_PORT_TEST,
                        auth: {
                            user: env.SMTP_USERNAME_TEST,
                            pass: env.SMTP_PASSWORD_TEST
                        }
                    });
                    var mailOptions = {
                        from: env.WEBTITLE + "<"+ env.SMTP_USERNAME_TEST +">",
                        to: env.EMAIL_ADMIN, // list of receivers
                        cc: env.EMAIL_MANAGER,
                        subject: "User Subscribed Successfully  ✔", // Subject line
                        text: req.body.email+" has subscribed GariConnect.", // plain text body
                
                    }
                    smtpTr.sendMail(mailOptions, function(err, data) {
                        if(err) {
                            res.status(400).json({
                                message: "There is something went wrong! cannot send an email",
                                subsc: errorResponse(err.message),
                            });
                        } else {
                            console.log('Email sent successfully');
                            res.status(200).json({
                                message: "User subscribed successfully with email = " + req.body.email,
                                subsc: successResponse(result),
                            });
                        }
                    });
                });
              }
            }
        })
        // Building support object from upoading request's body
       
    } catch (error) {
        logs("Support","Create","Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
