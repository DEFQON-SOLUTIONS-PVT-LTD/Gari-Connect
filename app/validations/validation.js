// VALIDATION
const Joi = require('joi');
const { joiPassword } = require('joi-password');

// CATEGORY VALIDATION
const saveCategoryValidations = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        created_by: Joi.string().required()
    });
    return schema.validate(data);
};
const updateCategoryValidation = (data) => {
    const schema = Joi.object({
        categoryId: Joi.string().required(),
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        updated_by: Joi.string().required()
    });
    return schema.validate(data);
};
// FEATURES  VALIDATION
const saveFeaturesValidations = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        icon: Joi.string().required(),
        is_active: Joi.boolean().required(),
        created_by: Joi.string().required(),
    });
    return schema.validate(data);
};
const updateFeaturesValidation = (data) => {
    const schema = Joi.object({
        featureId: Joi.string().required(),
        name: Joi.string().required(),
        icon: Joi.string().required(),
        is_active: Joi.boolean().required(),
        updated_by: Joi.string().required(),
    });
    return schema.validate(data);
};
// VEHICLETYPE  VALIDATION
const saveVehicleTypeValidations = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        created_by: Joi.string().required(),
    });
    return schema.validate(data);
};
const updateVehicleTypeValidation = (data) => {
    const schema = Joi.object({
        vehicle_type_id: Joi.string().required(),
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        updated_by: Joi.string().required(),
    });
    return schema.validate(data);
};

//BOOKINGS  VALIDATION
const saveBookingsValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        vehicleId: Joi.number().required(),
        is_active: Joi.boolean().required(),
        statusId: Joi.number().required(),
        trip_startDate: Joi.string().required(),
        trip_endDate: Joi.string().required(),
    });
    return schema.validate(data);
};
const updateBookingsValidation = (data) => {
    const schema = Joi.object({
        bookingId: Joi.number().required(),
        statusId: Joi.number().required(),
    });
    return schema.validate(data);
};
// MAKE VALIDATION
const saveMakeValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        created_by: Joi.string().required()
    });
    return schema.validate(data);
};
const updateMakeValidation = (data) => {
    const schema = Joi.object({
        makeId: Joi.string().required(),
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        updated_by: Joi.string().required()
    });
    return schema.validate(data);
};
//MODEL VALIDATION
const saveModelValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        created_by: Joi.string().required(),
        makeId: Joi.string().required()
    });
    return schema.validate(data);
};
const updateModelValidation = (data) => {
    const schema = Joi.object({
        modelId: Joi.string().required(),
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        updated_by: Joi.string().required(),
        makeId: Joi.string().required()
    });
    return schema.validate(data);
};
// GREENVEHICLE VALIDATION
const saveGreenVehicleValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        created_by: Joi.string().required(),
    });
    return schema.validate(data);
};
const updateGreenVehicleValidation = (data) => {
    const schema = Joi.object({
        greenVehicleId: Joi.string().required(),
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        updated_by: Joi.string().required(),
    });
    return schema.validate(data);
};
//GUIDELINE VALIDATION
const saveGuideLineValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        icon: Joi.string().required(),
        created_by: Joi.string().required(),
    });
    return schema.validate(data);
};
const updateGuideLineValidation = (data) => {
    const schema = Joi.object({
        guideLineId: Joi.string().required(),
        name: Joi.string().required(),
        icon: Joi.string().required(),
        is_active: Joi.boolean().required(),
        updated_by: Joi.string().required()
    });
    return schema.validate(data);
};
//TRANSMISSION VALIDATION
const saveTransmissionValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        created_by: Joi.string().required(),
    });
    return schema.validate(data);
};
const updateTransmissionValidation = (data) => {
    const schema = Joi.object({
        transmissionId: Joi.string().required(),
        name: Joi.string().required(),
        is_active: Joi.boolean().required(),
        updated_by: Joi.string().required()
    });
    return schema.validate(data);
};
//VEHICLE VALIDATION
const saveVehicleValidation = (data) => {
    const schema = Joi.object({
        locationId: Joi.string().required(),
        plate_number: Joi.string().required(),
        description: Joi.string().required(),
        seats: Joi.string().required(),
        vehicle_type_id: Joi.string().required(),
        green_vehicle_id: Joi.string().required(),
        categoryId: Joi.string().required(),
        transmissionId: Joi.string().required(),
        main_image: Joi.string().required(),
        price: Joi.number().required(),
        price_inc_driver: Joi.number().required(),
        userId: Joi.string().required(),
        modelId: Joi.string().required(),
        created_by: Joi.string().required(),
        features: Joi.array().items({ featureId: Joi.string().required() }),
        guidelines: Joi.array().items({ guidelineId: Joi.string().required() }),
        cancel: Joi.boolean().required(),

    });
    return schema.validate(data);
};
const updateVehicleValidation = (data) => {
    const schema = Joi.object({
        vehicleId: Joi.string().required(),
        locationId: Joi.string().required(),
        plate_number: Joi.string().required(),
        description: Joi.string().required(),
        seats: Joi.string().required(),
        vehicle_type_id: Joi.string().required(),
        green_vehicle_id: Joi.string().required(),
        categoryId: Joi.string().required(),
        transmissionId: Joi.string().required(),
        features: Joi.string().required(),
        main_image: Joi.string().required(),
        price: Joi.number().required(),
        price_inc_driver: Joi.number().required(),
        guidelines: Joi.string().required(),
        userId: Joi.string().required(),
        updated_by: Joi.string().required(),
        modelId: Joi.string().required(),
    });
    return schema.validate(data);
};

//USER VALIDATION
const saveUserValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phoneno: Joi.string().length(13).required(),
        email: Joi.string().email().trim(true).required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .required(),
        address: Joi.string().required(),
        photo: Joi.string().required(),
        cnic: Joi.string().required(),
        cnic_validity: Joi.string().required(),
        driving_license_number: Joi.string().required(),
        license_validity: Joi.string(),
        is_active: Joi.boolean().required(),
        permissionId: Joi.string().required(),
        roleId: Joi.string().required(),
        cityId: Joi.string().required(),
        gender: Joi.string().required(),
    });
    return schema.validate(data);
};
const updatePasswordValidation = (data) => {
    const schema = Joi.object({
        phone_no: Joi.string().length(13).required(),
        current_password: Joi.string(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .required().label('Password'),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().label('Confirm password')
            .options({ messages: { 'any.only': '{{#label}} does not match' } })
    });
    return schema.validate(data);
};
const updateUserValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phoneno: Joi.number().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).trim(true).required(),
        address: Joi.string().required(),
        photo: Joi.string().required(),
        cnic: Joi.string().required(),
        cnic_validity: Joi.string().required(),
        driving_license_number: Joi.string().required(),
        is_active: Joi.boolean().required(),
        permissionId: Joi.string().required(),
        roleId: Joi.string().required(),
        cityId: Joi.string().required(),
        gender: Joi.string().required(),
        otp: Joi.string().required(),
    });
    return schema.validate(data);
};

// User Card VALIDATION
const saveUserCardValidation = (data) => {
    const schema = Joi.object({
        card_number: Joi.string().required(),
        card_expiry: Joi.string().required(),
        cvv: Joi.number().required(),
        is_active: Joi.boolean(),
        userId: Joi.number().required()
    });
    return schema.validate(data);
};

const updateUserCardValidation = (data) => {
    const schema = Joi.object({
        user_card_information_id: Joi.number().required(),
        card_number: Joi.string().required(),
        card_expiry: Joi.string().required(),
        is_active: Joi.boolean(),
        cvv: Joi.number().required(),
        userId: Joi.number().required()
    });
    return schema.validate(data);
};

//UserReview VALIDATION
const saveUserReviewValidation = (data) => {
    const schema = Joi.object({
        rating: Joi.number().required(),
        feedback: Joi.string().required(),
        userId: Joi.number().required()
    });
    return schema.validate(data);
};

const updateUserReviewValidation = (data) => {
    const schema = Joi.object({
        rating: Joi.number().required(),
        feedback: Joi.string().required(),
        user_review_id: Joi.number().required()
    });
    return schema.validate(data);
};

const saveAuthUserValidation = (data) => {
    const schema = Joi.object({
        phone_no: Joi.string().min(11).max(13).required(),
    });
    return schema.validate(data);
};
// Support VALIDATION
const saveSupportValidation = (data) => {
    const schema = Joi.object({
        topic: Joi.string().required(),
        description: Joi.string().required(),
        userId: Joi.string().required(),
        created_by: Joi.string()
    });
    return schema.validate(data);
};
const updateSupportValidation = (data) => {
    const schema = Joi.object({
        supportId: Joi.string().required(),
        topic: Joi.string().required(),
        description: Joi.string().required(),
        userId: Joi.string().required(),
        updated_by: Joi.string().required()
    });
    return schema.validate(data);
};

const updateForgotPasswordValidation = (data) => {
    const schema = Joi.object({
        phone_no: Joi.string().length(13).required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .required().label('Password'),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().label('Confirm password')
            .options({ messages: { 'any.only': '{{#label}} does not match' } })

    });
    return schema.validate(data);
};
//USER VALIDATION
const saveStaffValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().trim(true).required(),
        permissionId: Joi.string().required(),
        roleId: Joi.string().required(),
        cityId: Joi.string().required(),
    });
    return schema.validate(data);
};
const updateStaffValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().trim(true).required(),
        permissionId: Joi.string().required(),
        roleId: Joi.string().required(),
        cityId: Joi.string().required(),
    });
    return schema.validate(data);
};
const updatePersonalInfoValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().trim(true).required(),
        phone_no: Joi.string().required(),
        address: Joi.string()

    });
    return schema.validate(data);
};
const saveSubscriberValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    });
    return schema.validate(data);
};

module.exports = {
    saveCategoryValidations,
    updateCategoryValidation,
    saveFeaturesValidations,
    updateFeaturesValidation,
    saveMakeValidation,
    updateMakeValidation,
    saveModelValidation,
    updateModelValidation,
    saveGreenVehicleValidation,
    updateGreenVehicleValidation,
    saveGuideLineValidation,
    updateGuideLineValidation,
    saveTransmissionValidation,
    updateTransmissionValidation,
    saveVehicleValidation,
    updateVehicleValidation,
    saveUserValidation,
    updateUserValidation,
    saveUserReviewValidation,
    updateUserReviewValidation,
    saveUserCardValidation,
    updateUserCardValidation,
    saveAuthUserValidation,
    saveBookingsValidation,
    updateBookingsValidation,
    saveSupportValidation,
    updateSupportValidation,
    saveVehicleTypeValidations,
    updateVehicleTypeValidation,
    updateForgotPasswordValidation,
    saveStaffValidation,
    updateStaffValidation,
    updatePasswordValidation,
    updatePersonalInfoValidation,
    saveSubscriberValidation,
}