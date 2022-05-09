// Import model Product
const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveSupportValidation, updateSupportValidation } = require('../validations/validation');
const { date } = require('joi');
const Support = db.Support;
const logs = require('../controllers/logging.js');
//const Op = db.Sequelize.Op;
// Create support 
exports.create = (req, res) => {
    let support = {};

    try {
        // Validate
        const { error } = saveSupportValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building support object from upoading request's body
        support.topic = req.body.topic;
        support.description = req.body.description;
        support.created_by = req.body.created_by;
        support.createdAt = new Date();
        support.userId = req.body.userId;

     
        Support.create(support).then(result => {
            // send uploading message to client
            logs("Support","Create","Info", "Create Successfully a Support with id = " + result.id);
            res.status(200).json({
                message: "Create Successfully a Support with id = " + result.id,
                support: successResponse(result),
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
// Update support  id
exports.updateSupport = async (req, res) => {
    try {
        // Validate
        const { error } = updateSupportValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let supportId = req.body.supportId;
        let support = await Support.findByPk(supportId);

        if (!support) {
            logs("Support","updateSupport","Info", "Not Found for updating a support with id = " + supportId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a support with id = " + supportId,
                support: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                supportId: req.body.supportId,
                topic: req.body.topic,
                description: req.body.description,
                updated_by: req.body.updated_by,
                updatedAt: new Date(),
                userId : req.body.userId
            }
            let result = await support.update(updatedObject, { returning: true, where: { supportId: supportId } });

            // return the response to client
            if (!result) {
                logs("Support","updateSupport","Error", "Error -> Can not update a support with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a support with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("Support","updateSupport","Info", "Update successfully a support with id = " + supportId);
            res.status(200).json({
                message: "Update successfully a support with id = " + supportId,
                support: updatedObject,
            });
        }
    } catch (error) {
        logs("Support","updateSupport","Info", "Update successfully a support with id = " + supportId);
        res.status(500).json({
            message: "Error -> Can not update a support with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
// Get  support
exports.getSupport = (req, res) => {

    Support.findAll()
        .then(supportInfos => {
            logs("Support","getSupport","Info", "Get all supports' Infos Successfully!");
            res.status(200).json({
                message: "Get all supports' Infos Successfully!",
                supports: supportInfos
            });
        })
        .catch(error => {
            // log on console
            logs("Support","getSupport","Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
// Get Support By id
exports.getSupportById = (req, res) => {
    let supportId = req.params.id;
    Support.findByPk(supportId)
        .then(support => {
            logs("Support","getSupportById","Info", "Successfully Get a support with id = " + supportId);
            res.status(200).json({
                message: "Successfully Get a support with id = " + supportId,
                supports: support
            });
        })
        .catch(error => {
            // log on console
            console.log(error);
            logs("Support","getSupportById","Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        await Support.destroy({
            where: {
                supportId: req.params.id
            }
        });
        logs("Support","deleteById","Info", "Support Deleted");
        res.json({
            "message": "Support Deleted"
        });
    } catch (err) {
        console.log(err);
        logs("Support","deleteById","Error", err);
    }
}