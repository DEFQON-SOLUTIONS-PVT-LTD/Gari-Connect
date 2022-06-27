// Import model Product
const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveEcoFriendlyValidation, updateEcoFriendlyValidation } = require('../validations/validation');
const { date } = require('joi');
const Eco_Friendly = db.eco_friendly;
const logs = require('../controllers/logging.js');
const crypto = require('crypto');
//const Op = db.Sequelize.Op;
// Create locations 
exports.create = (req, res) => {
    let Eco_friendly = {};
    try {
        // Validate
        const { error } = saveEcoFriendlyValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        Eco_friendly.name = req.body.name;
        Eco_friendly.isActive = req.body.isActive;

        // Save to MySQL database
        Eco_Friendly.create(Eco_friendly).then(result => {

            logs("ecoFriendly", "Create", "Info", "Successfully created a Eco_Friendly");
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a Eco_Friendly =" + result.eco_friendly_Id,
                EcoFriendly: successResponse(result),
            });
        });
    } catch (error) {
        logs("ecoFriendly", "Create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
exports.updateEcoFriendly = async (req, res) => {
    try {
        // Validate
        const { error } = updateEcoFriendlyValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let Ecofriendly_Id = req.body.eco_friendly_Id;
        let ecofriendly = await Eco_Friendly.findByPk(Ecofriendly_Id);

        if (!ecofriendly) {
            logs("ecoFriendly", "updateEcoFriendly", "Info", "Not Found for updating a EcoFriendly with id = " + Ecofriendly_Id);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a make with id = " + Ecofriendly_Id,
                ecofriendly: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                eco_friendly_Id: req.body.eco_friendly_Id,
                name: req.body.name,
                isActive: req.body.isActive,
            }
            let result = await ecofriendly.update(updatedObject, { returning: true, where: { eco_friendly_Id: Ecofriendly_Id } });

            // return the response to client
            if (!result) {
                logs("ecoFriendly", "updateEcoFriendly", "Error", "Error -> Can not update a EcoFriendly with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a make with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("ecoFriendly", "updateEcoFriendly", "Info", "Update successfully a EcoFriendly with id = " + Ecofriendly_Id);
            res.status(200).json({
                message: "Update successfully a EcoFriendly with id = " + Ecofriendly_Id,
                make: updatedObject,
            });
        }
    } catch (error) {
        logs("ecoFriendly", "updateMake", "Error", "Error -> Can not update a EcoFriendly with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a EcoFriendly with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getEcoFriendly = (req, res) => {

    Eco_Friendly.findAll()
        .then(ecofriendlyInfos => {
            logs("ecoFriendly", "getEcoFriendly", "Info", "Get all Eco_Friendly' Infos Successfully!");
            res.status(200).json({
                message: "Get all makes' Infos Successfully!",
                EcoFriendly: ecofriendlyInfos
            });
        })
        .catch(error => {
            // log on console
            logs("ecoFriendly", "getEcoFriendly", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

exports.getEcoFriendlyById = (req, res) => {
    let Ecofriendly_Id = req.params.id;
    Eco_Friendly.findByPk(Ecofriendly_Id)
        .then(ecofriendly => {
            logs("ecoFriendly", "getEcofriendlyById", "Info", "Successfully Get a Eco_Friendly with id = " + Ecofriendly_Id);
            res.status(200).json({
                message: " Successfully Get a Eco_Friendly with id = " + Ecofriendly_Id,
                ecofriendly: ecofriendly
            });
        })
        .catch(error => {
            // log on console
            logs("ecoFriendly", "getEcofriendlyById", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let Ecofriendly_Id = req.params.id;
        let eco_friendly = await Eco_Friendly.findByPk(Ecofriendly_Id);
        if (!eco_friendly) {
            logs("ecoFriendly", "create", "Info", "Not Found for Delete a Eco_Friendly with id = " + Ecofriendly_Id);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a Eco_Friendly with id = " + Ecofriendly_Id,
                error: "404"
            });
        } else {
            let updatedObject = {
                isActive: "false"
            }
            let result = await eco_friendly.update(updatedObject, { returning: true, where: { eco_friendly_Id: Ecofriendly_Id } });
            // return the response to client
            if (!result) {
                logs("ecoFriendly", "deleteById", "Error", "Error -> Can not delete a Eco_Friendly with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a Eco_Friendly with id = " + req.params.id,
                    error: "Id not Exists",
                });
            }
            logs("ecoFriendly", "deleteById", "Info", "delete successfully a Eco_Friendly with id = " + eco_friendly);
            res.status(200).json({
                message: "delete successfully a Eco_Friendly with id = " + Ecofriendly_Id
            });
        }
    } catch (error) {
        logs("ecoFriendly", "deleteById", "Info", "Error -> Can not delete a Eco_Friendly with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a Eco_Friendly with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }

}