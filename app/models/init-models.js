var DataTypes = require("sequelize").DataTypes;
var _State = require("./State");
var _authuser = require("./authuser");
var _availability = require("./availability");
var _bookings = require("./bookings");
var _categories = require("./categories");
var _city = require("./city");
var _days = require("./days");
var _eco_friendly = require("./eco_friendly");
var _favourite = require("./favourite");
var _features = require("./features");
var _fuel_type = require("./fuel_type");
var _green_vehicles = require("./green_vehicles");
var _guidelines = require("./guidelines");
var _locations = require("./locations");
var _logs = require("./logs");
var _makes = require("./makes");
var _models = require("./models");
var _permissions = require("./permissions");
var _roles = require("./roles");
var _status = require("./status");
var _subscribers = require("./subscribers");
var _supports = require("./supports");
var _transmissions = require("./transmissions");
var _user_card_informations = require("./user_card_informations");
var _user_documents = require("./user_documents");
var _user_reviews = require("./user_reviews");
var _user_transactions = require("./user_transactions");
var _users = require("./users");
var _vehicle_availability = require("./vehicle_availability");
var _vehicle_images = require("./vehicle_images");
var _vehicle_mandatory_features = require("./vehicle_mandatory_features");
var _vehicle_reviews = require("./vehicle_reviews");
var _vehicle_to_features = require("./vehicle_to_features");
var _vehicle_to_guidelines = require("./vehicle_to_guidelines");
var _vehicle_types = require("./vehicle_types");
var _vehicles = require("./vehicles");

function initModels(sequelize) {
  var State = _State(sequelize, DataTypes);
  var authuser = _authuser(sequelize, DataTypes);
  var availability = _availability(sequelize, DataTypes);
  var bookings = _bookings(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var days = _days(sequelize, DataTypes);
  var eco_friendly = _eco_friendly(sequelize, DataTypes);
  var favourite = _favourite(sequelize, DataTypes);
  var features = _features(sequelize, DataTypes);
  var fuel_type = _fuel_type(sequelize, DataTypes);
  var green_vehicles = _green_vehicles(sequelize, DataTypes);
  var guidelines = _guidelines(sequelize, DataTypes);
  var locations = _locations(sequelize, DataTypes);
  var logs = _logs(sequelize, DataTypes);
  var makes = _makes(sequelize, DataTypes);
  var models = _models(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);
  var subscribers = _subscribers(sequelize, DataTypes);
  var supports = _supports(sequelize, DataTypes);
  var transmissions = _transmissions(sequelize, DataTypes);
  var user_card_informations = _user_card_informations(sequelize, DataTypes);
  var user_documents = _user_documents(sequelize, DataTypes);
  var user_reviews = _user_reviews(sequelize, DataTypes);
  var user_transactions = _user_transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vehicle_availability = _vehicle_availability(sequelize, DataTypes);
  var vehicle_images = _vehicle_images(sequelize, DataTypes);
  var vehicle_mandatory_features = _vehicle_mandatory_features(sequelize, DataTypes);
  var vehicle_reviews = _vehicle_reviews(sequelize, DataTypes);
  var vehicle_to_features = _vehicle_to_features(sequelize, DataTypes);
  var vehicle_to_guidelines = _vehicle_to_guidelines(sequelize, DataTypes);
  var vehicle_types = _vehicle_types(sequelize, DataTypes);
  var vehicles = _vehicles(sequelize, DataTypes);

  city.belongsTo(State, { as: "state", foreignKey: "stateId"});
  State.hasMany(city, { as: "cities", foreignKey: "stateId"});
  vehicles.belongsTo(categories, { as: "category", foreignKey: "categoryId"});
  categories.hasMany(vehicles, { as: "vehicles", foreignKey: "categoryId"});
  locations.belongsTo(city, { as: "city", foreignKey: "cityId"});
  city.hasMany(locations, { as: "locations", foreignKey: "cityId"});
  users.belongsTo(city, { as: "city", foreignKey: "cityId"});
  city.hasMany(users, { as: "users", foreignKey: "cityId"});
  availability.belongsTo(days, { as: "day", foreignKey: "dayId"});
  days.hasMany(availability, { as: "availabilities", foreignKey: "dayId"});
  vehicle_availability.belongsTo(days, { as: "day", foreignKey: "dayid"});
  days.hasMany(vehicle_availability, { as: "vehicle_availabilities", foreignKey: "dayid"});
  vehicles.belongsTo(eco_friendly, { as: "eco_friendly", foreignKey: "eco_friendly_Id"});
  eco_friendly.hasMany(vehicles, { as: "vehicles", foreignKey: "eco_friendly_Id"});
  vehicle_to_features.belongsTo(features, { as: "feature", foreignKey: "featureId"});
  features.hasMany(vehicle_to_features, { as: "vehicle_to_features", foreignKey: "featureId"});
  vehicle_mandatory_features.belongsTo(fuel_type, { as: "fueltype_fuel_type", foreignKey: "fueltype"});
  fuel_type.hasMany(vehicle_mandatory_features, { as: "vehicle_mandatory_features", foreignKey: "fueltype"});
  vehicles.belongsTo(green_vehicles, { as: "green_vehicle", foreignKey: "green_vehicle_id"});
  green_vehicles.hasMany(vehicles, { as: "vehicles", foreignKey: "green_vehicle_id"});
  vehicle_to_guidelines.belongsTo(guidelines, { as: "guideline", foreignKey: "guidelineId"});
  guidelines.hasMany(vehicle_to_guidelines, { as: "vehicle_to_guidelines", foreignKey: "guidelineId"});
  vehicles.belongsTo(locations, { as: "location_location", foreignKey: "locationId"});
  locations.hasMany(vehicles, { as: "location_vehicles", foreignKey: "locationId"});
  models.belongsTo(makes, { as: "make", foreignKey: "makeId"});
  makes.hasMany(models, { as: "models", foreignKey: "makeId"});
  vehicles.belongsTo(models, { as: "model", foreignKey: "modelId"});
  models.hasMany(vehicles, { as: "vehicles", foreignKey: "modelId"});
  users.belongsTo(permissions, { as: "permission", foreignKey: "permissionId"});
  permissions.hasMany(users, { as: "users", foreignKey: "permissionId"});
  users.belongsTo(roles, { as: "role", foreignKey: "roleId"});
  roles.hasMany(users, { as: "users", foreignKey: "roleId"});
  bookings.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(bookings, { as: "bookings", foreignKey: "statusId"});
  vehicles.belongsTo(transmissions, { as: "transmission", foreignKey: "transmissionId"});
  transmissions.hasMany(vehicles, { as: "vehicles", foreignKey: "transmissionId"});
  user_transactions.belongsTo(user_card_informations, { as: "user_card_information", foreignKey: "user_card_information_id"});
  user_card_informations.hasMany(user_transactions, { as: "user_transactions", foreignKey: "user_card_information_id"});
  bookings.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(bookings, { as: "bookings", foreignKey: "userId"});
  favourite.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(favourite, { as: "favourites", foreignKey: "userId"});
  supports.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(supports, { as: "supports", foreignKey: "userId"});
  user_card_informations.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(user_card_informations, { as: "user_card_informations", foreignKey: "userId"});
  user_documents.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(user_documents, { as: "user_documents", foreignKey: "userId"});
  user_reviews.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(user_reviews, { as: "user_reviews", foreignKey: "userId"});
  vehicles.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(vehicles, { as: "vehicles", foreignKey: "userId"});
  vehicles.belongsTo(vehicle_types, { as: "vehicle_type", foreignKey: "vehicle_type_id"});
  vehicle_types.hasMany(vehicles, { as: "vehicles", foreignKey: "vehicle_type_id"});
  availability.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(availability, { as: "availabilities", foreignKey: "vehicleId"});
  bookings.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(bookings, { as: "bookings", foreignKey: "vehicleId"});
  favourite.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(favourite, { as: "favourites", foreignKey: "vehicleId"});
  locations.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(locations, { as: "locations", foreignKey: "vehicleId"});
  vehicle_availability.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleid"});
  vehicles.hasMany(vehicle_availability, { as: "vehicle_availabilities", foreignKey: "vehicleid"});
  vehicle_images.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(vehicle_images, { as: "vehicle_images", foreignKey: "vehicleId"});
  vehicle_mandatory_features.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(vehicle_mandatory_features, { as: "vehicle_mandatory_features", foreignKey: "vehicleId"});
  vehicle_reviews.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(vehicle_reviews, { as: "vehicle_reviews", foreignKey: "vehicleId"});
  vehicle_to_features.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(vehicle_to_features, { as: "vehicle_to_features", foreignKey: "vehicleId"});
  vehicle_to_guidelines.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicleId"});
  vehicles.hasMany(vehicle_to_guidelines, { as: "vehicle_to_guidelines", foreignKey: "vehicleId"});

  return {
    State,
    authuser,
    availability,
    bookings,
    categories,
    city,
    days,
    eco_friendly,
    favourite,
    features,
    fuel_type,
    green_vehicles,
    guidelines,
    locations,
    logs,
    makes,
    models,
    permissions,
    roles,
    status,
    subscribers,
    supports,
    transmissions,
    user_card_informations,
    user_documents,
    user_reviews,
    user_transactions,
    users,
    vehicle_availability,
    vehicle_images,
    vehicle_mandatory_features,
    vehicle_reviews,
    vehicle_to_features,
    vehicle_to_guidelines,
    vehicle_types,
    vehicles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
