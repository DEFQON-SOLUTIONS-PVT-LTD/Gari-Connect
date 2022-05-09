const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveCategoryValidations, updateCategoryValidation } = require('../validations/validation');
const Category = db.Category;
const crypto = require('crypto');
const logs = require('../controllers/logging.js');

//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    let category = {};
    
    try {
        // Validate
        const { error } = saveCategoryValidations(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        category.name = req.body.name;
        category.is_active = req.body.is_active;
        category.createdAt = new Date();
        category.uuid = crypto.randomUUID();
        category.created_by = req.body.created_by;

        // Save to MySQL database
        Category.create(category).then(result => {

            logs("Category","Create","Info", "Successfully created a category");
            // send uploading message to client
            res.status(200).json({
                message: "Create Successfully a category",
                category: successResponse(result),
            });
        });
    } catch (error) {
        logs("Category","Create","Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        // Validate
        const { error } = updateCategoryValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));

        let categoryId = req.body.categoryId;
        let category = await Category.findByPk(categoryId);

        if (!category) {
            logs("Category","Update","Error", "Not Found for updating a category with id = " + categoryId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a category with id = " + categoryId,
                category: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                categoryId: req.body.categoryId,
                name: req.body.name,
                is_active: req.body.is_active,
                updated_by: req.body.updated_by,
                updatedAt: new Date()
            }
            let result = await category.update(updatedObject, { returning: true, where: { categoryId: categoryId } });

            // return the response to client
            if (!result) {
                logs("Category","Update","Error", "Error -> Can not update a category with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a category with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            logs("Category","Update","Info", "Update successfully a category with id = " + categoryId);
            res.status(200).json({
                message: "Update successfully a category with id = " + categoryId,
                category: updatedObject,
            });
        }
    } catch (error) {
        logs("Category","Update","Error", "Error -> Can not update a category with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a category with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getCategory = (req, res) => {

    Category.findAll()
        .then(categoryInfos => {
            logs("Category","getCategory","Info", "Get all category' Infos Successfully!");
            res.status(200).json({
                message: "Get all category' Infos Successfully!",
                category: categoryInfos
            });
        })
        .catch(error => {
            // log on console
            logs("Category","getCategory","Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getCategoryById = (req, res) => {
    let categoryId = req.params.id;
    Category.findByPk(categoryId)
        .then(category => {
            
            if(category!=null){
                logs("Category","getCategoryById","Info", " Successfully Get a category with id = " + categoryId);
                res.status(200).json({
                    message: " Successfully Get a category with id = " + categoryId,
                    category: category
                });
            }else{
                logs("Category","getCategoryById","Info", "No Category found against categoryId = " + categoryId);
                res.status(404).json({
                    message: "No Category found against categoryId = " + categoryId,
                    category: category
                });
            }
            
        })
        .catch(error => {
            // log on console
            logs("Category","getCategoryById","Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        await Category.destroy({
            where: {
                categoryId: req.params.id
            }
        });
        logs("Category","deleteById","Info", "Category Deleted");
        res.json({
            "message": "Category Deleted"
        });
    } catch (err) {
        logs("Category","deleteById","Info", err);
    }
}