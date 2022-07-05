const db = require('../config/db.config.js');
const { successResponse, errorResponse } = require('../common/response');
const { saveVehicleImagesValidation, updateVehicleImagesValidation } = require('../validations/validation');
const VehicleImages = db.vehicle_images;
const crypto = require('crypto');
const logs = require('./logging.js');
const { date } = require('joi');

exports.getVehicleImages = (req, res) => {

    VehicleImages.findAll()
        .then(vehicleImagesInfos => {
            logs("VehicleImages", "getVehicleImages", "Info", "Get all VehicleImages' Infos Successfully!");
            res.status(200).json({
                message: "Get all VehicleImages' Infos Successfully!",
                VehicleImages: vehicleImagesInfos
            });
        })
        .catch(error => {
            // log on console
            logs("VehicleImages", "getVehicleImages", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

exports.getVehicleImagesById = (req, res) => {
    let VehicleImageId = req.params.id;
    VehicleImages.findByPk(VehicleImageId)
        .then(vehicleImage => {
            logs("VehicleImages", "getVehicleImagesById", "Info", "Successfully Get a VehicleImage with id = " + VehicleImageId);
            res.status(200).json({
                message: " Successfully Get a VehicleImage with id = " + VehicleImageId,
                vehicleImage: vehicleImage
            });
        })
        .catch(error => {
            // log on console
            logs("VehicleImages", "getVehicleImagesById", "Error", error.message);
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let vehicleImageId = req.params.id;
        let vehicleImage = await VehicleImages.findByPk(vehicleImageId);
        if (!vehicleImage) {
            logs("VehicleImages", "create", "Info", "Not Found for Delete a VehicleImage with id = " + vehicleImageId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a VehicleImage with id = " + vehicleImageId,
                error: "404"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1"
            }
            let result = await vehicleImage.update(updatedObject, { returning: true, where: { vehicle_image_id: vehicleImageId } });
            // return the response to client
            if (!result) {
                logs("VehicleImages", "deleteById", "Error", "Error -> Can not delete a VehicleImage with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a VehicleImage with id = " + req.params.id,
                    error: "Id not Exists",
                });
            }
            logs("VehicleImages", "deleteById", "Info", "delete successfully a VehicleImage with id = " + vehicleImageId);
            res.status(200).json({
                message: "delete successfully a VehicleImage with id = " + vehicleImageId
            });
        }
    } catch (error) {
        logs("VehicleImages", "deleteById", "Info", "Error -> Can not delete a VehicleImage with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a VehicleImage with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }

}

exports.uploadImage = async (req, res, next) => {

    try {

        // to declare some path to store your converted image
        const path = './images/' + Date.now() + '.png'

        const imgdata = req.body.base64image;

        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');

        fs.writeFileSync(path, base64Data, { encoding: 'base64' });

        return res.send(path);

    } catch (e) {
        next(e);
    }
}
exports.updateVehicleImagesByVehicle = async (req, res) => {
    let VehicleImage = {};
    let VehicleId = req.body.vehicleId;
    try {
        // Validate
        // const { error } = updateVehicleFeaturesValidation(req.body);
        //if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Save to MySQL database
        var result = await VehicleImages.destroy({
            where: {
                vehicleId: req.body.vehicleId
            }
        });
        if (result != null) {
            let Image = [];
            var val = req.body.vehicleimages.images;
            for (var i in val) {
                Image.push({ 'image': val[i].mainimage, 'vehicleId': VehicleId, 'setCover': val[i].setCover });
                VehicleImage.image_path = Image[i].image;
                VehicleImage.vehicleId = Image[i].vehicleId;
                VehicleImage.setCover = Image[i].setCover;
                VehicleImage.IsDeleted = '0';
                await VehicleImages.create(VehicleImage);
            }

            logs("VehicleImages", "updateVehicleImagesByVehicle", "Info", "Update successfully a VehicleImage with id = " + VehicleId);
            res.status(200).json({
                message: "Update successfully a VehicleImage with id = " + VehicleId,
                // VehicleImage: successResponse(data),
            });
        }
    }
    catch (error) {
        logs("VehicleImages", "updateVehicleImagesByVehicle", "Error", "Error -> Can not update a VehicleImage with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a VehicleImage with id = " + req.params.id,
            //error: error.message
            error: errorResponse(error.message)
        });
    }

}

