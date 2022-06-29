// Import model Product
const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveMakeValidation, updateMakeValidation } = require('../validations/validation');
const { date } = require('joi');
const Make = db.Make;
const logs = require('../controllers/logging.js');
const crypto = require('crypto');
//const Op = db.Sequelize.Op;
// Create make 
exports.create = (req, res) => {
    let make = {};

    try {
        // Validate
        const { error } = saveMakeValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building Make object from upoading request's body
        make.name = req.body.name;
        make.is_active = req.body.is_active;
        make.created_by = req.body.created_by;
        make.createdAt = new Date();
        make.uuid = crypto.randomUUID();
        make.IsDeleted = "0";

        // Save to MySQL database
        Make.create(make).then(result => {
            logs("Make", "Create", "Info", "Create Successfully a Make with id = " + result.makeId);
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a Make with id = " + result.makeId,
                make: successResponse(result),
            });
        });
    } catch (error) {
        logs("Make", "Create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
// Update make  id
exports.updateMake = async (req, res) => {
    try {
        // Validate
        const { error } = updateMakeValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let makeId = req.body.makeId;
        let make = await Make.findByPk(makeId);

        if (!make) {
            logs("Make", "updateMake", "Info", "Not Found for updating a make with id = " + makeId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a make with id = " + makeId,
                make: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                makeId: req.body.makeId,
                name: req.body.name,
                is_active: req.body.is_active,
                updated_by: req.body.updated_by,
                updatedAt: new Date()
            }
            let result = await make.update(updatedObject, { returning: true, where: { makeId: makeId } });

            // return the response to client
            if (!result) {
                logs("Make", "updateMake", "Error", "Error -> Can not update a make with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a make with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("Make", "updateMake", "Info", "Update successfully a make with id = " + makeId);
            res.status(200).json({
                message: "Update successfully a make with id = " + makeId,
                make: updatedObject,
            });
        }
    } catch (error) {
        logs("Make", "updateMake", "Error", "Error -> Can not update a make with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a make with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
// Get  make
exports.getMake = (req, res) => {

    Make.findAll()
        .then(makeInfos => {
            logs("Make", "getMake", "Info", "Get all makes' Infos Successfully!");
            res.status(200).json({
                message: "Get all makes' Infos Successfully!",
                makes: makeInfos
            });
        })
        .catch(error => {
            // log on console
            logs("Make", "getMake", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}
// Get Make By id
exports.getMakeById = (req, res) => {
    let makeId = req.params.id;
    Make.findByPk(makeId)
        .then(make => {
            logs("Make", "getMakeById", "Info", "Successfully Get a Make with id = " + makeId);
            res.status(200).json({
                message: " Successfully Get a Make with id = " + makeId,
                makes: make
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

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let makeId = req.params.id;
        let make = await Make.findByPk(makeId);
        if (!make) {
            logs("Make", "create", "Info", "Not Found for Delete a Make with id = " + makeId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a Make with id = " + makeId,
                error: "404"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1"
            }
            let result = await make.update(updatedObject, { returning: true, where: { makeId: makeId } });
            // return the response to client
            if (!result) {
                logs("Make", "deleteById", "Error", "Error -> Can not delete a Make with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a Make with id = " + req.params.id,
                    error: "Id not Exists",
                });
            }
            logs("Make", "deleteById", "Info", "delete successfully a Make with id = " + makeId);
            res.status(200).json({
                message: "delete successfully a Make with id = " + makeId
            });
        }
    } catch (error) {
        logs("Make", "deleteById", "Info", "Error -> Can not delete a Make with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a Make with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }

}