// Import model Product
const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveUserCardValidation, updateUserCardValidation } = require('../validations/validation');
const Usercard = db.UserCard;
const logs = require('../controllers/logging.js');
//const Op = db.Sequelize.Op;
// Create user card inforamtion 
exports.create = (req, res) => {
    let user_card = {};

    try {
        let usercard = Usercard.findOne({ where: { card_number: req.body.card_number } }).then(function (user_card_row) {
            if (usercard) {
                if (user_card_row != null) {
                    logs("UserCardInformation", "Create", "Error", "You cannot add this card with this No. = " + req.body.card_number);
                    errordetails = {
                        message: "You cannot add this card with this No. = " + req.body.card_number,
                        status: false
                    }
                    return res.status(400).send(errorResponse(errordetails, {}));
                } else {
                    // Validate
                    const { error } = saveUserCardValidation(req.body);
                    if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
                    // Building Card Information object from upoading request's body
                    user_card.card_number = req.body.card_number;
                    user_card.card_expiry = req.body.card_expiry;
                    user_card.cvv = req.body.cvv;
                    user_card.is_active = req.body.is_active;
                    user_card.userId = req.body.userId;
                    user_card.IsDeleted = "0";

                    // Save to Postgress database
                    Usercard.create(user_card).then(result => {
                        // send uploading message to client
                        logs("UserCardInformation", "Create", "Info", "Create Successfully a User Card Information with id = " + result.user_card_information_id);
                        res.status(200).json({
                            message: "Create Successfully a User Card Information with id = " + result.user_card_information_id,
                            cardinfo: successResponse(result),
                        });
                    });
                }
            }
        })

    } catch (error) {
        logs("UserCardInformation", "Create", "Error", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
// Update Card Information  id
exports.updateCardInfo = async (req, res) => {
    try {
        // Validate
        const { error } = updateUserCardValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let userCardInformationId = req.body.user_card_information_id;
        let usercardinfo = await Usercard.findByPk(userCardInformationId);

        if (!usercardinfo) {
            // return a response to client
            logs("UserCardInformation", "updateCardInfo", "Info", "Not Found for updating a card information with id = " + userCardInformationId);
            res.status(404).json({
                message: "Not Found for updating a card information with id = " + userCardInformationId,
                cardinfo: "",
                error: "404",
                type: "userCardInformationId"
            });
        } else {
            // update new change to database
            let updatedObject = {
                user_card_information_id: req.body.user_card_information_id,
                card_number: req.body.card_number,
                card_expiry: req.body.card_expiry,
                cvv: req.body.cvv,
                is_active: req.body.is_active,
                userId: req.body.userId
            }
            let result = await usercardinfo.update(updatedObject, { returning: true, where: { user_card_information_id: userCardInformationId } });

            // return the response to client
            if (!result) {
                logs("UserCardInformation", "updateCardInfo", "Error", "Error -> Can not update a card information with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a card information with id = " + req.params.id,
                    error: "Can NOT Updated",
                    type: "userCardInformationId"
                });
            }
            logs("UserCardInformation", "updateCardInfo", "Info", "Update successfully a card information");
            res.status(200).json({
                message: "Update successfully a card information  ",
                make: updatedObject,
            });
        }
    } catch (error) {
        logs("UserCardInformation", "updateCardInfo", "Error", error.message);
        res.status(500).json({
            message: "Error -> Can not update a user card",
            //error: error.message
            error: errorResponse(error.message)
        });
    }
}
// Get  Card Information
exports.getCardInfos = (req, res) => {

    Usercard.findAll()
        .then(cardInfos => {
            logs("UserCardInformation", "getCardInfos", "Info", "Get all Cards Infos Successfully!");
            res.status(200).json({
                message: "Get all Cards Infos Successfully!",
                makes: cardInfos
            });
        })
        .catch(error => {
            // log on console
            logs("UserCardInformation", "getCardInfos", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
// Get Card Information By id
exports.getCardInfoById = (req, res) => {
    let userCardInformationId = req.params.id;
    Usercard.findByPk(userCardInformationId)
        .then(cardinfo => {
            logs("UserCardInformation", "getCardInfoById", "Info", "Successfully Get a Card Information with id = " + userCardInformationId);
            res.status(200).json({
                message: "Successfully Get a Card Information with id = " + userCardInformationId,
                cardinfos: cardinfo
            });
        })
        .catch(error => {
            // log on console
            logs("UserCardInformation", "getCardInfoById", "Error", error.message);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        // Validate
        let userCardInformationId = req.params.id;
        if (!userCardInformationId) {
            logs("UserCardInformation", "create", "Info", "Not Found for Delete a Card Information with id = " + userCardInformationId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for Deleting a Card Information with id = " + userCardInformationId,
                error: "404",
                type: "userCardInformationId"
            });
        } else {
            let updatedObject = {
                IsDeleted: "1"
            }
            let result = await Usercard.update(updatedObject, { returning: true, where: { user_card_information_id: userCardInformationId } });
            // return the response to client
            if (!result) {
                logs("UserCardInformation", "deleteById", "Error", "Error -> Can not Card Information a model with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a Card Information with id = " + req.params.id,
                    error: "Id not Exists",
                    type: "userCardInformationId"
                });
            }
            logs("UserCardInformation", "deleteById", "Info", "delete successfully a Card Information with id = " + userCardInformationId);
            res.status(200).json({
                message: "delete successfully a Card Information with id = " + userCardInformationId
            });
        }
    } catch (error) {
        logs("UserCardInformation", "deleteById", "Info", "Error -> Can not delete a Card Information with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not delete a Card Information with id = " + req.params.id,
            error: errorResponse(error.message)
        });
    }
}