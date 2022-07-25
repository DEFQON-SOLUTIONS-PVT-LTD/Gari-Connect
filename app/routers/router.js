let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/env.js');
const authJwt = require("../config/authJwt.js");


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
const subscriber = require('../controllers/subscriber.controller.js');
const vehicleReviews = require('../controllers/vehicleReviews.controller.js');
const vehicleAvailability = require('../controllers/vehicleAvailability.controller.js');
const location = require('../controllers/location.controller.js');
const ecofriendly = require('../controllers/ecoFriendly.controller.js');
const vehicleMandatoryFeatures = require('../controllers/vehicleMandatoryFeatures.controller.js');
const vehicleImages = require('../controllers/vehicleImages.controller.js');



router.post(
    '/api/auth/makecall',
    customers.makecall
);
router.post(
    '/api/auth/whatsapp',
    customers.whatsappVerification
);
//define routes for the whole app
router.post('/api/auth/token', customers.authenticate);
router.post(
    '/api/auth/authuser',
    customers.authuser
);
router.post(
    '/api/auth/forgotpassword',
    customers.forgotpassword
);
router.put(
    '/api/auth/changepassword',
    users.updatePassword
);
router.put(
    '/api/auth/resetpassword',
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
    customers.verifyOtp
);
router.post(
    '/api/auth/signin',
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
    users.create
);
router.put(
    '/api/user/createPassword',
    users.createPassword
);
router.put(
    '/api/user/updatePhoneNo',
    users.updatePhoneNo
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
    //[authJwt.verifyToken],
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
    //[authJwt.verifyToken],
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
router.get(
    '/api/model/getbymakeId/:id',
    //[authJwt.verifyToken],
    model.getModelByMakeId
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
    //[authJwt.verifyToken],
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
router.post(
    '/api/guideLine/updateByVehicleId',
    [authJwt.verifyToken],
    guideLine.updateGuideLineByVehicle
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
router.get(
    '/api/guideLine/getguidelinebyid/:id',
    guideLine.getguidelineByVehicleId
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
router.post(
    '/api/features/updatefeaturesByVehicle',
    [authJwt.verifyToken],
    features.updateFeaturesByVehicle
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
router.get(
    '/api/features/getfeaturebyid/:id',
    features.getfeaturesByVehicleId
);
router.put('/api/vehicle/isfavourite', vehicle.IsFavourite);
router.put('/api/vehicle/cancel', vehicle.CancelBooking);
router.get('/api/vehicle/vehicleList', vehicle.getVehicleList);
router.post('/api/vehicle/vehicleSearch', vehicle.getVehicleBySearch);
router.get('/api/vehicle/vehicleDetails/:id', vehicle.getVehicleListDetail);
router.post(
    '/api/vehicle/create',
    //[authJwt.verifyToken],
    vehicle.create
);
router.put(
    '/api/vehicle/update',
    [authJwt.verifyToken],
    vehicle.updateVehicle
);
router.get(
    '/api/vehicle/all',
    //[authJwt.verifyToken],
    vehicle.getVehicle
);
router.get(
    '/api/vehicle/getbyid',
    [authJwt.verifyToken],
    vehicle.getVehicleDetails
);
router.get(
    '/api/vehicle/getvrhiclebyid/:id',
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
router.post(
    '/api/vehicle/getvehiclebyfilter',
    //[authJwt.verifyToken],
    vehicle.getVehicleByFilters
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

router.post(
    '/api/subscribe/email',
    [authJwt.verifyToken],
    subscriber.create
);

router.post('/api/vehicleType/create', vehicleType.create);
router.put('/api/vehicleType/update', vehicleType.updateVehicleType);
router.get('/api/vehicleType/all', vehicleType.getVehicleType);
router.get('/api/vehicleType/getById/:id', vehicleType.getvehicletypeById);
router.delete('/api/vehicleType/delete/:id', vehicleType.deleteById);

router.post('/api/vehicleAvailability/create', vehicleAvailability.create);
router.get('/api/vehicleAvailability/getbyid/:id', vehicleAvailability.getAvailabilityByVehicleId);
router.put('/api/vehicleAvailability/update', vehicleAvailability.updateAvailabilityByVehicle);


router.post('/api/vehicleMandatoryFeatures/create', vehicleMandatoryFeatures.create);
router.get('/api/vehicleMandatoryFeatures/getById/:id', vehicleMandatoryFeatures.getVehicleMandatoryFeaturesById);
router.put('/api/vehicleMandatoryFeatures/update', vehicleMandatoryFeatures.updateVehicleMandatoryFeaturesByVehicle);

router.post('/api/ecofriendly/create', ecofriendly.create);
router.put('/api/ecofriendly/update', ecofriendly.updateEcoFriendly);
router.get('/api/ecofriendly/all', ecofriendly.getEcoFriendly);
router.get('/api/ecofriendly/getById/:id', ecofriendly.getEcoFriendlyById);
router.delete('/api/ecofriendly/delete/:id', ecofriendly.deleteById);


router.post('/api/location/create', location.create);
router.put('/api/location/update', location.updateLocation);
router.get('/api/location/all', location.getLocation);
router.get('/api/location/getById/:id', location.getLocationById);
router.delete('/api/location/delete/:id', location.deleteById);
router.get('/api/location/getLocationByVehicleId/:id', location.getLocationByVehicleId);
router.put('/api/location/updateByVehicle', location.updateLocationByVehicle);

router.post('/api/vehicleReviews/create', vehicleReviews.create);

//router.post('/api/vehicleImages/create', vehicleImages.AddImage);
router.get('/api/vehicleImages/all', vehicleImages.getVehicleImages);
router.get('/api/vehicleImages/getById/:id', vehicleImages.getVehicleImagesById);
router.delete('/api/vehicleImages/delete/:id', vehicleImages.deleteById);
router.put('/api/vehicleImages/updateByVehicle', vehicleImages.updateVehicleImagesByVehicle);

router.get('/api/dashboard/all', dashboard.getDashboardData);


module.exports = router;