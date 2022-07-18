const db = require('../config/db.config.js');
const Authuser = db.Authuser;
const env = require('../config/env.js');
const { messages } = require('../common/messages');
const { successResponse, errorResponse } = require('../common/response');
const logs = require('../controllers/logging.js');
const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const {
    saveUserValidation,
    updateUserValidation,
    saveStaffValidation,
    updateStaffValidation,
    updatePasswordValidation,
    updatePersonalInfoValidation,
    createPasswordValidation
} = require('../validations/validation');
const User = db.Users;
const Roles = db.Roles;
const Permissions = db.Permissions;
const crypto = require('crypto');
const { encrypt, decrypt } = require('../config/crypto_hash.js');
const { type } = require('os');
const { Users } = require('../config/db.config.js');
const Op = db.Sequelize.Op;

exports.addstaff = (req, res) => {
    let staff = {};
    try {
        // Validate
        const { error } = saveStaffValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // Building model object from upoading request's body
        const hashpassword = encrypt('123456789');
        staff.firstname = req.body.firstname;
        staff.lastname = req.body.lastname;
        staff.email = req.body.email;
        staff.password = hashpassword;
        staff.uuid = crypto.randomUUID();
        staff.permissionId = req.body.permissionId;
        staff.roleId = req.body.roleId;
        staff.cityId = req.body.cityId;
        // Save to Postgress database
        User.create(staff).then(result => {
            // send uploading message to client
            logs("User", "addstaff", "Info", "Staff is added successfully!");
            res.status(200).json({
                message: "Staff is added successfully!",
                staff: successResponse(result),
            });
        });
    } catch (error) {
        logs("User", "addstaff", "Info", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
exports.updateStaff = async (req, res) => {
    try {
        // Validate
        const { error } = updateStaffValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let userId = req.body.userId;
        let user = await User.findByPk(userId);

        if (!user) {
            logs("User", "updateStaff", "Info", "Not Found for updating a staff with id = " + userId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a staff with id = " + userId,
                user: "",
                error: "404",
                type: "userId"
            });
        } else {
            const hashpassword = encrypt('987456321');
            // update new change to database
            let updatedObject = {
                userId: req.body.userId,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashpassword,
                permissionId: req.body.permissionId,
                roleId: req.body.roleId,
                cityId: req.body.cityId,
                updatedAt: new Date(),
            }
            let result = await user.update(updatedObject, { returning: true, where: { userId: userId } });

            // return the response to client
            if (!result) {
                logs("User", "updateStaff", "Info", "Error -> Can not update a staff with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a staff with id = " + req.params.id,
                    error: "Can not Updated",
                    type: "userId"
                });
            }
            logs("User", "updateStaff", "Info", "Update successfully a staff with id = " + userId);
            res.status(200).json({
                message: "Update successfully a staff with id = " + userId,
                user: updatedObject,
            });
        }
    } catch (error) {
        logs("User", "updateStaff", "Error", "Error -> Can not update a staff with id = " + req.params.id);
        res.status(500).json({
            message: "Error -> Can not update a staff with id = " + req.params.id,
            // error: error.message
            error: errorResponse(error.message)
        });
    }
}
exports.updatePersonalInfo = async (req, res) => {
    try {
        // Validate
        const { error } = updatePersonalInfoValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let userId = req.body.userId;
        let user = await User.findByPk(userId);

        if (!user) {
            // return a response to client
            logs("User", "updatePersonalInfo", "Error", "Not Found for updating a personal info with id = " + userId);
            res.status(404).json({
                message: "Not Found for updating a personal info with id = " + userId,
                user: "",
                error: "404",
                type: "userId"
            });
        } else {
            // update new change to database
            let updatedObject = {
                userId: req.body.userId,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phoneno: req.body.phone_no,
                address: req.body.address,
                updatedAt: new Date(),
            }
            let result = await user.update(updatedObject, { returning: true, where: { userId: userId } });

            // return the response to client
            if (!result) {
                logs("User", "updatePersonalInfo", "Error", "Error -> Can not update a personal info with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a personal info with id = " + req.params.id,
                    error: "Can not Updated",
                    type: "userId"
                });
            }
            logs("User", "updatePersonalInfo", "Error", "Update successfully a personal inforamtion with id = " + userId);
            res.status(200).json({
                message: "Update successfully a personal inforamtion with id = " + userId,
                user: updatedObject,
            });
        }
    } catch (error) {
        logs("User", "updatePersonalInfo", "Error", error.message);

        res.status(500).json({
            message: "Error -> Can not update a personal inforamtion with id = " + req.params.id,
            // error: error.message
            error: errorResponse(error.message)
        });
    }
}
exports.updatePassword = async (req, res) => {
    try {
        // Validate
        const { error } = updatePasswordValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let userInstance = User.findOne({ where: { phoneno: req.body.phone_no } }).then(function (userrow) {
            if (userInstance) {
                if (userrow != null) {
                    let userId = userrow.userId;
                    passwordIsValid = decrypt(userrow.password)
                    if (passwordIsValid != req.body.current_password) {
                        logs("User", "updatePassword", "Error", "Current Password is incorrect!");
                        return res.status(401).send({
                            message: "Current Password is incorrect!"
                        });
                    }
                    const hashpassword = encrypt(req.body.password);
                    // update new change to database
                    let updatedObject = {
                        password: hashpassword,
                        updatedAt: new Date()
                    }
                    let result = User.update(updatedObject, { returning: true, where: { userId: userId } });

                    // return the response to client
                    if (!result) {
                        logs("User", "updatePassword", "Info", "Error -> Can not change the password with phone no. = " + req.body.phone_no);
                        res.status(500).json({
                            message: "Error -> Can not change the password with phone no. = " + req.body.phone_no,
                            error: "Can NOT Updated",
                            type: "phoneno"
                        });
                    }
                    logs("User", "updatePassword", "Info", "Password changed successfully.");

                    res.status(200).json({
                        message: "Password changed successfully.",
                        status: true,
                        data: updatedObject
                    });


                } else {
                    logs("User", "updatePassword", "Error", "Somethinng went wrong.");
                    res.status(500).json({
                        status: false,
                        message: "Somethinng went wrong.",
                    });
                }
            }
        })

    } catch (error) {
        logs("User", "updatePassword", "Error", error.message);
        res.status(500).json({
            message: "Error -> Can not password a staff with Phone = " + req.body.phone_no,
            // error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getAllStaff = (req, res) => {
    User.belongsTo(Permissions, { foreignKey: "permissionId" });
    Permissions.hasMany(User, { foreignKey: "permissionId" });
    User.belongsTo(Roles, { foreignKey: "roleId" });
    Roles.hasMany(User, { foreignKey: "roleId" });

    User.findAll({
        attributes: [
            'userId',
            'firstname',
            'lastname',
            'email',
            'uuid',
        ],
        include: [
            {
                model: Roles,
                attributes: ['name']
            }, {
                model: Permissions,
                attributes: ['name']
            }
        ],
        where: {
            [Op.and]: [{
                roleId: {
                    [Op.ne]: 1
                }
            },
            {
                roleId: {
                    [Op.ne]: 3
                }
            },
            {
                roleId: {
                    [Op.ne]: 4
                }
            }]
        }
    })
        .then(staffInfos => {
            if (staffInfos.length == 0) {
                logs("User", "getAllStaff", "Info", "No Staff found!");
                res.status(404).json({
                    message: "No Staff found!",
                    staff: false
                });
                return false;
            }
            logs("User", "getAllStaff", "Info", "Retrieved all Staff Info Successfully!");
            res.status(200).json({
                message: "Retrieved all Staff Info Successfully!",
                user: staffInfos
            });
        })
        .catch(error => {
            // log on console
            logs("User", "getAllStaff", "Info", error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
// google signup api
exports.createSocialUser = (req, res) => {
    let user = {};
    try {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(guser => {
                if (guser) {
                    logs("User", "createSocialUser", "Info", "User already exists. Please try to login.");
                    return res.status(404).send({ message: "User already exists. Please try to login.", type: "email" });
                } else {
                    // Building model object from upoading request's body
                    user.firstname = req.body.firstname;
                    user.lastname = req.body.lastname;
                    user.email = req.body.email;
                    user.photo = req.body.photo;
                    user.is_active = "true";
                    user.permissionId = "1";
                    user.roleId = "1";
                    user.gender = req.body.gender;
                    // Save to Postgress database
                    User.create(user).then(result => {
                        // send uploading message to client
                        logs("User", "createSocialUser", "Info", "Successfully Created a User with id = " + result.id);
                        res.status(200).json({
                            message: "Successfully Created a User with id = " + result.id,
                            user: successResponse(result),
                        });
                    });
                }
            });

    } catch (error) {
        logs("User", "createSocialUser", "Error", error.message);

        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}

exports.create = async (req, res) => {
    let user = {};
    try {
        // Validate
        const { error } = saveUserValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));

        let checkUserByPhone = await User.findOne({ where: { phoneno: req.body.phoneno } });
        if (checkUserByPhone != null) {
            logs("MainController", "authuser", "Info", "Phone No. Already in use try to login with this No. = " + req.body.phoneno);
            errordetails = {
                message: "Phone No. Already in use try to login with this No. = " + req.body.phoneno,
                status: false,
                type: 'phoneno'
            }
            res.status(400).json({
                message: "Fail!",
                error: errordetails
            });
        }

        let checkUserByEmail = await User.findOne({ where: { email: req.body.email } });
        if (checkUserByEmail != null) {
            logs("MainController", "authuser", "Info", "Email Already in use try to login with this  = " + req.body.email);
            errordetails = {
                message: "Email Already in use try to login with this  = " + req.body.email,
                status: false,
                type: 'email'
            }
            res.status(400).json({
                message: "Fail!",
                error: errordetails
            });
        }
        else {
            let forgotpwd = {};
            var expiryTime = 60;
            var rand = Math.floor(Math.random() * 10000) + 1;
            // two factor authentication
            client.messages.create({
                body: 'Your OTP code is : ' + rand + ' to reset your password. This code will expires in ' + expiryTime + ' Seconds',
                from: env.TWILIO_PHONE_NUMBER,
                to: req.body.phoneno
            })
                .then(message => console.log(message.sid));
            var expiry_time;
            expiry_time = new Date();
            //expires in one minute.
            expiry_time.setSeconds(expiry_time.getSeconds() + expiryTime);

            forgotpwd.phone_no = req.body.phoneno;
            forgotpwd.otp_code = rand;
            forgotpwd.otp_expiry = expiry_time;
            Authuser.create(forgotpwd).then(result => {
                // send uploading message to client
                logs("MainController", "forgotpassword", "Info", "OTP sent to = " + req.body.phoneno + ". Please verify to continue ");
            });

            // Building model object from upoading request's body
            // const hashpassword = encrypt(req.body.password);
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.phoneno = req.body.phoneno;
            user.email = req.body.email;
            //user.password = hashpassword;
            user.address = req.body.address;
            user.photo = req.body.photo;
            user.is_active = "true";
            // user.uuid = crypto.randomUUID();
            user.permissionId = "1";
            user.roleId = "1";
            user.cityId = req.body.cityId;
            user.gender = req.body.gender;
            user.otp = rand;
            user.otp_expiry = expiry_time;
            // Save to Postgress database
            User.create(user).then(result => {
                // send uploading message to client
                logs("User", "create", "Info", "Successfully Created a User with id = " + result.userId);
                res.status(200).json({
                    message: "Successfully Created a User with id = " + result.userId,
                    user: successResponse(result),
                });
            });
        }
    } catch (error) {
        logs("User", "create", "Info", error.message);
        res.status(500).json({
            message: "Fail!",
            error: errorResponse(error.message)
        });
    }
}
exports.updateUser = async (req, res) => {
    try {
        // Validate
        const { error } = updateUserValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        let userId = req.body.userId;
        let user = await User.findByPk(userId);

        if (!user) {
            // return a response to client
            logs("User", "create", "Info", "Not Found for updating a user with id = " + userId);
            res.status(404).json({
                message: "Not Found for updating a user with id = " + userId,
                user: "",
                error: "404",
                type: "userId"
            });
        } else {
            const hashpassword = encrypt(req.body.password);
            // update new change to database
            let updatedObject = {
                userId: req.body.userId,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phoneno: req.body.phoneno,
                password: hashpassword,
                address: req.body.address,
                photo: req.body.photo,
                cnic: req.body.cnic,
                cnic_validity: req.body.cnic_validity,
                driving_license_number: req.body.driving_license_number,
                is_active: req.body.is_active,
                otp: req.body.otp,
                otp_expiry: req.body.otp_expiry,
                uuid: crypto.randomUUID(),
                permissionId: req.body.permissionId,
                roleId: req.body.roleId,
                cityId: req.body.cityId,
                gender: req.body.gender,
                updatedat: new Date()
            }
            let result = await user.update(updatedObject, { returning: true, where: { userId: userId } });

            // return the response to client
            if (!result) {
                logs("User", "create", "Info", "Error -> Can not update a user with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a user with id = " + req.params.id,
                    error: "Can not Updated",
                    type: "userId"
                });
            }
            logs("User", "create", "Info", "Update successfully a user with id = " + userId);
            res.status(200).json({
                message: "Update successfully a user with id = " + userId,
                user: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a user with id = " + req.params.id,
            // error: error.message
            error: errorResponse(error.message)
        });
    }
}

exports.getUsers = (req, res) => {

    User.findAll()
        .then(userInfos => {
            res.status(200).json({
                message: "Get all user Infos Successfully!",
                user: userInfos
            });
        })
        .catch(error => {
            // log on console
            logs("User", "create", "Info", error);


            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getUserById = (req, res) => {
    let userId = req.params.id;
    User.findByPk(userId)
        .then(user => {
            logs("User", "getUserById", "Info", "Successfully Get a user with id = " + userId);

            res.status(200).json({
                message: "Successfully Get a user with id = " + userId,
                user: user
            });
        })
        .catch(error => {
            // log on console
            console.log(error);
            logs("User", "getUserById", "Error", error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.deleteById = async (req, res) => {
    try {
        await User.destroy({
            where: {
                userId: req.params.id
            }
        });
        logs("User", "deleteById", "Info", "User Deleted");
        res.json({
            "message": "user Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}
exports.deleteStaffById = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            logs("User", "deleteStaffById", "Info", "Not Found for deleting a staff with id = " + userId);
            // return a response to client
            res.status(404).json({
                message: "Not Found for deleting a staff with id = " + userId,
                user: "",
                error: "404",
                type: "userId"
            });
        } else {
            let updatedObject = {
                userId: req.params.id,
                is_active: false,
                updatedAt: new Date(),
            }
            let result = await user.update(updatedObject, {
                returning: true,
                where: {
                    userId: req.params.id
                }
            });

            // return the response to client
            if (!result) {
                logs("User", "deleteStaffById", "Error", "Error -> Can not delete a staff with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not delete a staff with id = " + req.params.id,
                    error: "Can not Updated",
                    type: "UserId"
                });
            }
            logs("User", "deleteStaffById", "Info", "Deleted successfully a staff with id = " + req.params.id);
            res.status(200).json({
                message: "Deleted successfully a staff with id = " + req.params.id,
                user: updatedObject,
            });
            // let staffDelete = await User.destroy({
            //         where: {
            //             [Op.or]: [
            //             {
            //                 userId: {
            //                     [Op.eq]: req.params.id
            //                 }
            //             }],
            //             [Op.and]: [
            //             {
            //                 roleId: {
            //                     [Op.ne]: 1
            //                 }
            //             },
            //             {
            //                 roleId: {
            //                     [Op.ne]: 3
            //                 }
            //             },
            //             {
            //                 roleId: {
            //                     [Op.ne]: 4
            //                 }
            //             }]

            //         }
            //     });
            //     if(staffDelete!=0){
            //         res.json({
            //             "message": "Staff Deleted"
            //         });
            //     }else{
            //         res.json({
            //             "message": "Could not delete staff"
            //         });
            //     }

        }

    } catch (err) {
        logs("User", "deleteStaffById", "Error", err);
    }
}
exports.createPassword = async (req, res) => {

    try {
        // Validate
        const { error } = createPasswordValidation(req.body);
        if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        const hashpassword = encrypt(req.body.password);
        let UserId = req.body.userId;
        let user = await User.findByPk(UserId);
        if (!user) {
            // return a response to client
            logs("User", "createPassword", "Info", "UserId. does not exists with this Id. = " + UserId);
            res.status(404).json({
                message: "Not Found for create password with id = " + UserId,
                user: "",
                error: "404",
                type: "userId"
            });
        }
        else {
            let updatedObject = {
                userId: UserId,
                password: hashpassword
            }
            let result = await user.update(updatedObject, { returning: true, where: { userId: UserId } });
            if (!result) {
                logs("User", "createPassword", "Error", "Error -> Can not update a password with id = " + req.params.id);
                res.status(500).json({
                    message: "Error -> Can not update a password with id = " + req.params.id,
                    error: "Can NOT Updated",
                    type: 'userId'
                });
            }
            logs("User", "createPassword", "Error", "Update successfully a password with id = " + UserId);
            res.status(200).json({
                message: "Update successfully a password with id = " + UserId,
                user: updatedObject,
            });
        }
    }
    catch (error) {
        logs("MainController", "forgotpassword", "Error", error.message);
        res.status(403).json({
            message: "Forbidden!",
            error: errorResponse(error.message)
        });
    }
}
exports.updatePhoneNo = async (req, res) => {
    try {
        let updatedObject = {
            phoneno: '0'
        }
        let result = await Users.update(updatedObject, { returning: true, where: {} });
        // return the response to client
        if (!result) {
            logs("User", "updatePhoneNo", "Error", "Error -> Can not update a phoneNo");
            res.status(500).json({
                message: "Error -> Can not update a PhoneNo",
                error: "Can NOT Updated",
                type: "PhoneNo"
            });
        }
        logs("User", "updatePhoneNo", "Error", "Update successfully PhoneNo");
        res.status(200).json({
            message: "Update successfully PhoneNo ",
            Users: updatedObject,
        });
    }
    catch (error) {
        logs("User", "updatePhoneNo", "Error", error.message);
        res.status(500).json({
            message: "Error -> Can not update a PhoneNo",
            // error: error.message
            error: errorResponse(error.message)
        });
    }
}