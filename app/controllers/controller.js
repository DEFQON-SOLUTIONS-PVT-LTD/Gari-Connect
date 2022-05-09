
const db = require('../config/db.config.js');
const env = require('../config/env.js');
const { successResponse, errorResponse } = require('../common/response');
const jwt = require('jsonwebtoken');
const Customer = db.Customer;
const User = db.Users;
const Authuser = db.Authuser;
const { encrypt, decrypt } = require('../config/crypto_hash.js');
const { saveAuthUserValidation, updateForgotPasswordValidation } = require('../validations/validation');
const { Users } = require('../config/db.config.js');

const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.forgotpassword = (req, res) => {
  let forgotpwd = {};
  try {
    let checkUserByPhone = User.findOne({ where: {phoneno: req.body.phone_no} }).then(function(user_row) {
      if (checkUserByPhone) {
        if(user_row==null){
          errordetails = {
            message: "Phone No. does not exists with this No. = " + req.body.phone_no,
            status: false
          }
          return res.status(400).send(errorResponse(errordetails, {}));
         
        }else{
          let authUserPhone = Authuser.findOne({ where: {phone_no: req.body.phone_no} }).then(function(userrow) {
            if (authUserPhone) {
              if(userrow!=null){
               Authuser.destroy({
                where: {
                    authuserId: userrow.authuserId
                }
            });
          }
            }
          })
          var expiryTime = 60;
           // Validate
           const { error } = saveAuthUserValidation(req.body);
           if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
          var rand = Math.floor(Math.random() * 10000) + 1;
          // two factor authentication
          client.messages.create({
            body: 'Your OTP code is : ' + rand + ' to reset your password. This code will expires in '+ expiryTime + ' Seconds',
            from: env.TWILIO_PHONE_NUMBER,
            to: req.body.phone_no
          })
            .then(message => console.log(message.sid));
      
      
            var expiry_time;
            expiry_time = new Date();
            //expires in one minute.
            expiry_time.setSeconds(expiry_time.getSeconds() + expiryTime);
            
            forgotpwd.phone_no = req.body.phone_no;
            forgotpwd.otp_code = rand;
            forgotpwd.otp_expiry= expiry_time;
            Authuser.create(forgotpwd).then(result => {
              // send uploading message to client
              res.status(200).json({
                message: "OTP sent to = " + req.body.phone_no+". Please verify to continue ",
                customer: successResponse(result),
              });
            });
        }
      }
    })
  
  }
  catch (error) {
    res.status(403).json({
      message: "Forbidden!",
      error: errorResponse(error.message)
    });
  }
}


exports.authuser = (req, res) => {
  let authuser = {};
  try {
    let checkUserByPhone = User.findOne({ where: {phoneno: req.body.phone_no} }).then(function(user_row) {
      if (checkUserByPhone) {
        if(user_row!=null){
          errordetails = {
            message: "Phone No. Already in use try to login with this No. = " + req.body.phone_no,
            status: false
          }
          return res.status(400).send(errorResponse(errordetails, {}));
         
        }else{
          let authUserPhone = Authuser.findOne({ where: {phone_no: req.body.phone_no} }).then(function(userrow) {
            if (authUserPhone) {
              if(userrow!=null){
               Authuser.destroy({
                where: {
                    authuserId: userrow.authuserId
                }
            });
          }
            }
          })
          var expiryTime = 60;
           // Validate
           const { error } = saveAuthUserValidation(req.body);
           if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
          var rand = Math.floor(Math.random() * 10000) + 1;
          // two factor authentication
          client.messages.create({
            body: 'Your OTP code is : ' + rand + ' Do not share with anyone at any risk. This code will expires in '+ expiryTime + ' Seconds',
            from: env.TWILIO_PHONE_NUMBER,
            to: req.body.phone_no
          })
            .then(message => console.log(message.sid));
      
      
            var expiry_time;
            expiry_time = new Date();
            //expires in one minute.
            expiry_time.setSeconds(expiry_time.getSeconds() + expiryTime);
            
            authuser.phone_no = req.body.phone_no;
            authuser.otp_code = rand;
            authuser.otp_expiry= expiry_time;
      
        
            // Save to MySQL database
            Authuser.create(authuser).then(result => {
              // send uploading message to client
              res.status(200).json({
                message: "Phone No. saved and otp sent to = " + req.body.phone_no,
                customer: successResponse(result),
              });
            });
        }
      }
    })
  
  }
  catch (error) {
    res.status(403).json({
      message: "Forbidden!",
      error: errorResponse(error.message)
    });
  }
}

exports.setForgotPassword = (req, res) => {
  try {
    const { error } = updateForgotPasswordValidation(req.body);
    if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
        // return the response to client
    let userInstance = User.findOne({ where: {phoneno: req.body.phone_no} }).then(function(userrow) {
      if (userInstance) {
        if(userrow!=null){
          let userId = userrow.userId;
          let userupdate = Users.findByPk(userId);
            const hashpassword = encrypt(req.body.password);
             // update new change to database
             let updatedObject = {
              password: hashpassword,
              updatedAt: new Date()
             }
          let result = Users.update(updatedObject, { returning: true, where: { userId: userId } });

          // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not reset the password with phone no. = " + req.body.phone_no,
                    error: "Can NOT Updated",
                });
            }
            res.status(200).json({
              message: "Password reset successfully.",
              status: true,
              data: updatedObject
            });
          

        }else{
          res.status(500).json({
            status:false,
            message: "Somethinng went wrong.",
        });
        }
      }
    })
  }
  catch (error) {
    res.status(403).json({
      message: "Forbidden!",
      error: errorResponse(error.message)
    });
  }
}

exports.verifyOtp = (req, res) => {
  try {
    let authUserPhone = Authuser.findOne({ where: {phoneno: req.body.phone_no, otp_code: req.body.otp_code} }).then(function(userrow) {
      if (authUserPhone) {
        if(userrow!=null){
          let dateNow = new Date();
          let expiryDate = userrow.otp_expiry;
          // User took too long to enter the code
          console.log(expiryDate <= dateNow.getTime());
          if ( expiryDate <= dateNow.getTime())
          {
            res.status(403).json({
              status:false,
              message: "Your OTP code has been expired! Click below to resend.",
          });
          }else{
            res.status(200).json({
              message: "OTP code verified.",
              status: true
          });
          }

        }else{
          res.status(500).json({
            status:false,
            message: "Somethinng went wrong.",
        });
        }
      }
    })
  }
  catch (error) {
    res.status(403).json({
      message: "Forbidden!",
      error: errorResponse(error.message)
    });
  }
}

exports.authenticate = (req, res) => {
  let user = {};

  try {

    const users = { id: 3, user_token: 4 }

    const token = jwt.sign({ users }, env.secretkey);
    res.json({
      token: token
    })
  }
  catch (error) {
    res.status(403).json({
      message: "Forbidden!",
      error: errorResponse(error.message)
    });
  }
}
exports.signin = (req, res) => {
  User.findOne({
    where: {
      phoneno: req.body.phoneno
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if(!user.is_active){
        return res.status(401).send({
          accessToken: null,
          message: "User is not approved!"
        });
      }
     if(user.isGoogleUser==0 || user.isFacebookUser==0 ){
      passwordIsValid = decrypt(user.password)
      if (passwordIsValid != req.body.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
     }
      var token = jwt.sign({ id: user.userId }, env.secretkey, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        data: user,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.create = (req, res) => {
  let customer = {};

  try {
    // Building Customer object from upoading request's body
    customer.firstname = req.body.firstname;
    customer.lastname = req.body.lastname;
    customer.address = req.body.address;
    customer.age = req.body.age;

    // Save to MySQL database
    Customer.create(customer).then(result => {
      // send uploading message to client
      res.status(200).json({
        message: "Upload Successfully a Customer with id = " + result.id,
        customer: successResponse(result),
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: errorResponse(error.message)
    });
  }
}

exports.retrieveAllCustomers = (req, res) => {
  // find all Customer information from 
  Customer.findAll()
    .then(customerInfos => {
      res.status(200).json({
        message: "Get all Customers' Infos Successfully!",
        customers: customerInfos
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

exports.getCustomerById = (req, res) => {
  // find all Customer information from 
  let customerId = req.params.id;
  Customer.findByPk(customerId)
    .then(customer => {
      res.status(200).json({
        message: " Successfully Get a Customer with id = " + customerId,
        customers: customer
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


exports.filteringByAge = (req, res) => {
  let age = req.query.age;

  Customer.findAll({
    attributes: ['id', 'firstname', 'lastname', 'age', 'address', 'copyrightby'],
    where: { age: age }
  })
    .then(results => {
      res.status(200).json({
        message: "Get all Customers with age = " + age,
        customers: results,
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error!",
        error: error
      });
    });
}

exports.pagination = (req, res) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    const offset = page ? page * limit : 0;

    Customer.findAndCountAll({ limit: limit, offset: offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
          data: {
            "copyrightby": "https://loizenai.com",
            "totalItems": data.count,
            "totalPages": totalPages,
            "limit": limit,
            "currentPageNumber": page + 1,
            "currentPageSize": data.rows.length,
            "customers": data.rows
          }
        };
        res.send(response);
      });
  } catch (error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }
}

exports.pagingfilteringsorting = (req, res) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let age = parseInt(req.query.age);

    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);

    Customer.findAndCountAll({
      attributes: ['id', 'firstname', 'lastname', 'age', 'address'],
      where: { age: age },
      order: [
        ['firstname', 'ASC'],
        ['lastname', 'DESC']
      ],
      limit: limit,
      offset: offset
    })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
          data: {
            "copyrightby": "https://loizenai.com",
            "totalItems": data.count,
            "totalPages": totalPages,
            "limit": limit,
            "age-filtering": age,
            "currentPageNumber": page + 1,
            "currentPageSize": data.rows.length,
            "customers": data.rows
          }
        };
        res.send(response);
      });
  } catch (error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }
}

exports.updateById = async (req, res) => {
  try {
    let customerId = req.params.id;
    let customer = await Customer.findByPk(customerId);

    if (!customer) {
      // return a response to client
      res.status(404).json({
        message: "Not Found for updating a customer with id = " + customerId,
        customer: "",
        error: "404"
      });
    } else {
      // update new change to database
      let updatedObject = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        age: req.body.age
      }
      let result = await Customer.update(updatedObject, { returning: true, where: { id: customerId } });

      // return the response to client
      if (!result) {
        res.status(500).json({
          message: "Error -> Can not update a customer with id = " + req.params.id,
          error: "Can NOT Updated",
        });
      }

      res.status(200).json({
        message: "Update successfully a Customer with id = " + customerId,
        customer: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can not update a customer with id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let customerId = req.params.id;
    let customer = await Customer.findByPk(customerId);

    if (!customer) {
      res.status(404).json({
        message: "Does Not exist a Customer with id = " + customerId,
        error: "404",
      });
    } else {
      await customer.destroy();
      res.status(200).json({
        message: "Delete Successfully a Customer with id = " + customerId,
        customer: customer,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can NOT delete a customer with id = " + req.params.id,
      error: error.message,
    });
  }
}