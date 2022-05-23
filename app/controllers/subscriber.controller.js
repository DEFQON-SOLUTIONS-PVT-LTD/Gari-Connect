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
        // Building support object from upoading request's body
        subscriber.email = req.body.email;
        subscriber.createdAt = new Date();
        
     
        Subscriber.create(subscriber).then(result => {
            // send uploading message to client
            logs("Subscriber","Create","Info", "User subscribed successfully");

            var smtpTr = nodemailer.createTransport({
                host: "mail.ifc.com.pk",
                port: 465,
                auth: {
                    user: "test@ifc.com.pk",
                    pass: "q{V}v}Kruf1z"
                }
            });
        
            var mailOptions = {
                from: "test@ifc.com.pk",
                to: "raza4907404@gmail.com", // list of receivers
                subject: "User Subscribed Successfully  ✔", // Subject line
                text: req.body.email+" has subscribed GariConnect.", // plain text body
        
            }
          
            smtpTr.sendMail(mailOptions, function(err, data) {
                if(err) {
                    console.log(err.message);
                    res.status(400).json({
                        message: "There is something went wrong! cannot send an email",
                        support: errorResponse(err.message),
                    });
                } else {
                    console.log('Email sent successfully');
                    res.status(200).json({
                        message: "User subscribed successfully with email = " + req.body.email,
                        support: successResponse(result),
                    });
                }
            });
            
           
        });
    } catch (error) {
        logs("Support","Create","Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
