// Import model Product
const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveModelValidation, updateModelValidation } = require('../validations/validation');
const { date } = require('joi');
const Model = db.Model;
const logs = require('../controllers/logging.js');
const crypto = require('crypto');

//const Op = db.Sequelize.Op;
// Create model 
exports.create = (req, res) => {
    let model = {};

    try {
        // Validate
        const { error } = saveModelValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        model.name = req.body.name;
        model.is_active = req.body.is_active;
        model.created_by = req.body.created_by;
        model.createdAt = new Date();
        model.makeId = req.body.makeId;
        model.uuid = crypto.randomUUID();

        // Save to MySQL database
        Model.create(model).then(result => {
            logs("Model","Create","Info", "Create Successfully a model with id = " + result.id);
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a model with id = " + result.id,
                model: successResponse(result),
            });
        });
    } catch (error) {
        logs("Model","Create","Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
// Update model  id
exports.updateModel = async (req, res) => {
    try {
        // Validate
        const { error } = updateModelValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let modelId = req.body.modelId;
        let model = await Model.findByPk(modelId);

        if (!model) {
            logs("Model","updateModel","Info", "Not Found for updating a model with id = " + modelId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a model with id = " + modelId,
                model: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                modelId: req.body.modelId,
                name: req.body.name,
                is_active: req.body.is_active,
                updated_by: req.body.updated_by,
                updatedAt: new Date(),
                makeId: req.body.makeId

            }
            let result = await model.update(updatedObject, { returning: true, where: { modelId: modelId } });

            // return the response to client
            if (!result) {
                logs("Model","updateModel","Error", "Error -> Can not update a model with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a model with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("Model","updateModel","Error", "Update successfully a model with id = " + modelId);
            res.status(200).json({
                message: "Update successfully a model with id = " + modelId,
                model: updatedObject,
            });
        }
    } catch (error) {
        logs("Model","updateModel","Error", "Error -> Can not update a model with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a model with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
// Get  model
exports.getModel = (req, res) => {

    Model.findAll()
        .then(modelInfos => {
            logs("Model","getModel","Info", "Get all models' Infos Successfully!");
            res.status(200).json({
                message: "Get all models Infos Successfully!",
                models: modelInfos
            });
        })
        .catch(error => {
            // log on console
            logs("Model","getModel","Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
// Get model By id
exports.getModelById = (req, res) => {
    let modelId = req.params.id;
    Model.findByPk(modelId)
        .then(model => {
            logs("Model","getModelById","Info", "Successfully Get a model with id = " + modelId);
            res.status(200).json({
                message: "Successfully Get a model with id = " + modelId,
                models: model
            });
        })
        .catch(error => {
            // log on console
            logs("Model","getModelById","Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        await Model.destroy({
            where: {
                modelId: req.params.id
            }
        });
        logs("Model","deleteById","Info","Model Deleted");
        res.json({
            "message": "Model Deleted"
        });
    } catch (err) {
        logs("Model","deleteById","Info",err);
    }
}