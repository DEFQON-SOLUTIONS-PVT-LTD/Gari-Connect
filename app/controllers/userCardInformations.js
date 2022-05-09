// Import model Product
const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const { saveUserCardValidation, updateUserCardValidation } = require('../validations/validation');
const Usercard = db.UserCard;

//const Op = db.Sequelize.Op;
// Create user card inforamtion 
exports.create = (req, res) => {
    let user_card = {};

    try {
        let usercard = Usercard.findOne({ where: {card_number: req.body.card_number} }).then(function(user_card_row) {
            if (usercard) {
              if(user_card_row!=null){
                errordetails = {
                    message: "You cannot add this card with this No. = " + req.body.card_number,
                    status: false
                  }
                  return res.status(400).send(errorResponse(errordetails, {}));
                }else{
                     // Validate
                const { error } = saveUserCardValidation(req.body);
                if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
                // Building Card Information object from upoading request's body
                user_card.card_number = req.body.card_number;
                user_card.card_expiry = req.body.card_expiry;
                user_card.cvv = req.body.cvv;
                user_card.is_active = req.body.is_active;
                user_card.userId = req.body.userId;

                // Save to Postgress database
                Usercard.create(user_card).then(result => {
                    // send uploading message to client
                    res.status(200).json({
                        message: "Create Successfully a User Card Information with id = " + result.id,
                        cardinfo: successResponse(result),
                    });
                });
                }
            }
        })
       
    } catch (error) {
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
            res.status(404).json({
                message: "Not Found for updating a card information with id = " + userCardInformationId,
                cardinfo: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                user_card_information_id: req.body.user_card_information_id,
                card_number : req.body.card_number,
                card_expiry : req.body.card_expiry,
                cvv : req.body.cvv,
                is_active : req.body.is_active,
                userId : req.body.userId
            }
            let result = await usercardinfo.update(updatedObject, { returning: true, where: { user_card_information_id: userCardInformationId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a card information with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a card information  ",
                make: updatedObject,
            });
        }
    } catch (error) {
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
            res.status(200).json({
                message: "Get all Cards Infos Successfully!",
                makes: cardInfos
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
// Get Card Information By id
exports.getCardInfoById = (req, res) => {
    let userCardInformationId = req.params.id;
    Usercard.findByPk(userCardInformationId)
        .then(cardinfo => {
            res.status(200).json({
                message: " Successfully Get a Card Information with id = " + userCardInformationId,
                cardinfos: cardinfo
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

exports.deleteById = async (req, res) => {
    try {
        await Usercard.destroy({
            where: {
                user_card_information_id: req.params.id
            }
        });
        res.json({
            "message": "Card Informations Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}