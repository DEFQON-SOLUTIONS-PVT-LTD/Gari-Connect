let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/env.js');
const  authJwt  = require("../config/authJwt.js");


const customers = require('../controllers/controller.js');
const usercard = require('../controllers/userCardInformations.js');
const users = require('../controllers/users.controller.js');
const make = require('../controllers/make.controller.js');
const support = require('../controllers/support.controller.js');
const model = require('../controllers/model.controller.js');
const greenVehicle = require('../controllers/greenVehicle.controller.js');
const guideLine = require('../controllers/guideLine.controller.js');
const category = require('../controllers/category.controller.js');
const transmission = require('../controllers/transmission.controller.js');
const features = require('../controllers/features.controller.js');
const vehicle = require('../controllers/vehicle.controller.js');
const userReview = require('../controllers/userReview.controller.js');
const bookings = require('../controllers/bookings.controller.js');
const vehicleType = require('../controllers/vehicleType.controller.js');
const dashboard = require('../controllers/dashboard.controller.js');
//define routes for the whole app
router.post('/api/auth/token', customers.authenticate);
router.post(
    '/api/auth/authuser',
    [authJwt.verifyToken],
     customers.authuser
    );
router.post(
    '/api/auth/forgotpassword',
    [authJwt.verifyToken],
     customers.forgotpassword
     );
router.put(
        '/api/auth/changepassword',
        [authJwt.verifyToken],
         users.updatePassword
         );
router.put(
    '/api/auth/resetpassword',
    [authJwt.verifyToken],
     customers.setForgotPassword
     );
router.put(
    '/api/staff/update',
    [authJwt.verifyToken],
     users.updateStaff
     );
router.put(
        '/api/user/personalinfo',
        [authJwt.verifyToken],
         users.updatePersonalInfo
         );
router.post(
    '/api/staff/addstaff',
    [authJwt.verifyToken],
     users.addstaff
     );
router.get(
    '/api/staff/getstaff',
    [authJwt.verifyToken],
     users.getAllStaff
     );
router.delete(
    '/api/staff/delete/:id',
    [authJwt.verifyToken],
     users.deleteStaffById
     );

router.post(
    '/api/auth/verifyotp',
    [authJwt.verifyToken],
     customers.verifyOtp
     );
router.post(
    '/api/auth/signin',
    [authJwt.verifyToken],
     customers.signin
     );

router.post(
    '/api/customers/create',
    [authJwt.verifyToken],
     customers.create
     );

router.get(
    '/api/customers/all',
    [authJwt.verifyToken],
     customers.retrieveAllCustomers
     );
router.get(
    '/api/customers/onebyid/:id',
    [authJwt.verifyToken],
     customers.getCustomerById
     );
router.get(
    '/api/customers/filteringbyage',
    [authJwt.verifyToken],
     customers.filteringByAge
     );
router.get(
    '/api/customers/pagination',
    [authJwt.verifyToken],
     customers.pagination
     );
router.get(
    '/api/customers/pagefiltersort',
    [authJwt.verifyToken],
     customers.pagingfilteringsorting
     );
router.put(
    '/api/customers/update/:id',
    [authJwt.verifyToken],
     customers.updateById
     );
router.delete(
    '/api/customers/delete/:id',
    [authJwt.verifyToken],
     customers.deleteById
     );

// user api call
router.post(
    '/api/user/createSocialUser',
    [authJwt.verifyToken],
     users.createSocialUser
     );
router.post(
    '/api/usercard/create',
    [authJwt.verifyToken],
     usercard.create
     );
router.put(
    '/api/usercard/update',
    [authJwt.verifyToken],
     usercard.updateCardInfo
     );
router.get(
    '/api/usercard/getallcardinfo',
    [authJwt.verifyToken],
     usercard.getCardInfos
     );
router.delete(
    '/api/usercard/deletecardinfo/:id',
    [authJwt.verifyToken],
     usercard.deleteById
     );

router.get(
    '/api/usercard/getcardinfo/:id',
    [authJwt.verifyToken],
     usercard.getCardInfoById
     );
router.post(
    '/api/user/create',
    [authJwt.verifyToken],
     users.create
     );
router.put(
    '/api/user/update',
    [authJwt.verifyToken],
     users.updateUser
     );
router.get(
    '/api/user/getusers',
    [authJwt.verifyToken],
    users.getUsers
    );
router.get(
    '/api/user/getuser/:id',
    [authJwt.verifyToken],
     users.getUserById
     );

router.post(
    '/api/make/create', 
    [authJwt.verifyToken],
    make.create
    );
router.put(
    '/api/make/update',
    [authJwt.verifyToken],
     make.updateMake
     );
router.get(
    '/api/make/all',
    [authJwt.verifyToken],
     make.getMake
     );
router.get(
    '/api/make/getbyid/:id',
    [authJwt.verifyToken],
     make.getMakeById
     );
router.delete(
    '/api/make/delete/:id',
    [authJwt.verifyToken],
     make.deleteById
     );

router.post(
    '/api/model/create',
    [authJwt.verifyToken],
     model.create
     );
router.put(
    '/api/model/update',
    [authJwt.verifyToken],
     model.updateModel
     );
router.get(
    '/api/model/all',
    [authJwt.verifyToken],
     model.getModel
     );
router.get(
    '/api/model/getbyid/:id',
    [authJwt.verifyToken],
     model.getModelById
     );
router.delete(
    '/api/model/delete/:id',
    [authJwt.verifyToken],
     model.deleteById
     );

router.post(
    '/api/greenVehicle/create',
    [authJwt.verifyToken],
     greenVehicle.create
     );
router.put(
    '/api/greenVehicle/update',
    [authJwt.verifyToken],
     greenVehicle.updateGreenVehicle
     );
router.get(
    '/api/greenVehicle/all',
    [authJwt.verifyToken],
     greenVehicle.getGreenVehicle
     );
router.get(
    '/api/greenVehicle/getbyid/:id',
    [authJwt.verifyToken],
     greenVehicle.getGreenVehicleById
     );
router.delete(
    '/api/greenVehicle/delete/:id',
    [authJwt.verifyToken],
     greenVehicle.deleteById
     );

router.post(
    '/api/guideLine/create',
    [authJwt.verifyToken],
     guideLine.create
     );
router.put(
    '/api/guideLine/update',
    [authJwt.verifyToken],
     guideLine.updateGuideLine
     );
router.get(
    '/api/guideLine/all',
    [authJwt.verifyToken],
     guideLine.getGuideLine
     );
router.get(
    '/api/guideLine/getbyid/:id',
    [authJwt.verifyToken],
     guideLine.getGuideLineById
     );
router.delete(
    '/api/guideLine/delete/:id',
    [authJwt.verifyToken],
     guideLine.deleteById
     );

router.post(
    '/api/category/create',
    [authJwt.verifyToken],
     category.create
     );
router.put(
    '/api/category/update',
    [authJwt.verifyToken],
     category.updateCategory
     );
router.get(
    '/api/category/all',
    [authJwt.verifyToken],
     category.getCategory
     );
router.get(
    '/api/category/getbyid/:id',
    [authJwt.verifyToken],
     category.getCategoryById
     );
router.delete(
    '/api/category/delete/:id',
    [authJwt.verifyToken],
     category.deleteById
     );

router.post(
    '/api/transmission/create',
    [authJwt.verifyToken], 
     transmission.create
     );
router.put(
    '/api/transmission/update',
    [authJwt.verifyToken],
     transmission.updateTransmission
     );
router.get(
    '/api/transmission/all',
    [authJwt.verifyToken],
     transmission.getTransmission
     );
router.get(
    '/api/transmission/getbyid/:id',
    [authJwt.verifyToken],
     transmission.getTransmissionById
     );
router.delete(
    '/api/transmission/delete/:id',
    [authJwt.verifyToken],
     transmission.deleteById
     );

router.post(
    '/api/features/create',
    [authJwt.verifyToken],
     features.create
     );
router.put(
    '/api/features/update',
    [authJwt.verifyToken],
     features.updateFeatures
     );
router.get(
    '/api/features/all',
    [authJwt.verifyToken],
     features.getFeatures
     );
router.get(
    '/api/features/getbyid/:id',
    [authJwt.verifyToken],
     features.getFeaturesById
     );
router.delete(
    '/api/features/delete/:id',
    [authJwt.verifyToken],
     features.deleteById
     );
     router.put('/api/vehicle/isfavourite', vehicle.IsFavourite);
     router.put('/api/vehicle/cancel', vehicle.CancelBooking);
     router.get('/api/vehicle/vehicleList', vehicle.getVehicleList);
router.post(
    '/api/vehicle/create',
    [authJwt.verifyToken],
     vehicle.create
     );
router.put(
    '/api/vehicle/update',
    [authJwt.verifyToken],
     vehicle.updateVehicle
     );
router.get(
    '/api/vehicle/all',
    [authJwt.verifyToken],
     vehicle.getVehicle
     );
router.get(
    '/api/vehicle/getbyid/:id',
    [authJwt.verifyToken],
     vehicle.getVehicleById
     );
router.delete(
    '/api/vehicle/delete/:id',
    [authJwt.verifyToken],
     vehicle.deleteById
     );

router.post(
    '/api/userReview/create',
    [authJwt.verifyToken],
     userReview.create
     );
router.put(
    '/api/userReview/updateUserReview',
    [authJwt.verifyToken],
     userReview.updateUserReview
     );
router.get(
    '/api/userReview/getUserReviews',
     userReview.getUserReviews
     );
router.get(
    '/api/userReview/getUserReviewById/:id',
    [authJwt.verifyToken],
     userReview.getUserReviewById
     );
router.delete(
    '/api/userReview/deleteReviewById/:id',
    [authJwt.verifyToken],
     userReview.deleteReviewById
     );
     router.put('/api/bookings/statusUpdate', bookings.statusUpdate);
router.post(
    '/api/bookings/create',
    [authJwt.verifyToken],
     bookings.create
     );
router.get(
    '/api/bookings/all',
    [authJwt.verifyToken],
     bookings.getBooking
     );
router.get(
    '/api/bookings/getbyid/:id',
    [authJwt.verifyToken],
     bookings.getBookingById
     );
router.delete(
    '/api/bookings/delete/:id',
    [authJwt.verifyToken],
     bookings.deleteById
     );
router.put(
    '/api/bookings/IsApproved',
    [authJwt.verifyToken],
     bookings.IsApproved
     );
router.put(
    '/api/bookings/IsReject',
    [authJwt.verifyToken],
     bookings.IsReject
     );

router.post(
    '/api/support/create',
    [authJwt.verifyToken],
     support.create
     );
router.put(
    '/api/support/update',
    [authJwt.verifyToken],
     support.updateSupport
     );
router.get(
    '/api/support/all',
    [authJwt.verifyToken],
     support.getSupport
     );
router.get(
    '/api/support/getbyid/:id',
    [authJwt.verifyToken],
     support.getSupportById
     );
router.delete(
    '/api/support/delete/:id',
    [authJwt.verifyToken],
     support.deleteById
     );

router.post('/api/vehicleType/create', vehicleType.create);
router.put('/api/vehicleType/update', vehicleType.updateVehicleType);
router.get('/api/vehicleType/all', vehicleType.getVehicleType);
router.get('/api/vehicleType/getById/:id', vehicleType.getvehicletypeById);
router.delete('/api/vehicleType/delete/:id', vehicleType.deleteById);

router.get('/api/dashboard/all', dashboard.getDashboardData);


module.exports = router;