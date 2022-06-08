
const env = require('./env.js');

//db Configurations
const Sequelize = require('sequelize');
//const SequelizeAuto = require('sequelize-auto');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 1,
  secret_key: env.secretkey,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Users = require('../models/users.js')(sequelize, Sequelize);
db.State = require('../models/State.js')(sequelize, Sequelize);
db.Roles = require('../models/roles.js')(sequelize, Sequelize);
db.Permissions = require('../models/permissions.js')(sequelize, Sequelize);
db.UserCard = require('../models/user_card_informations.js')(sequelize, Sequelize);
db.UserDocuments = require('../models/user_documents.js')(sequelize, Sequelize);
db.Make = require('../models/makes.js')(sequelize, Sequelize);
db.Model = require('../models/models.js')(sequelize, Sequelize);
db.GreenVehicle = require('../models/green_vehicles.js')(sequelize, Sequelize);
db.GuideLine = require('../models/guidelines.js')(sequelize, Sequelize);
db.Category = require('../models/categories.js')(sequelize, Sequelize);
db.Transmission = require('../models/transmissions.js')(sequelize, Sequelize);
db.Features = require('../models/features.js')(sequelize, Sequelize);
db.Vehicle = require('../models/vehicles.js')(sequelize, Sequelize);
db.UserReviews = require('../models/user_reviews.js')(sequelize, Sequelize);
db.Authuser = require('../models/authuser.js')(sequelize, Sequelize);
db.Bookings = require('../models/bookings.js')(sequelize, Sequelize);
db.Support = require('../models/supports.js')(sequelize, Sequelize);
db.Booking = require('../models/booking.js')(sequelize, Sequelize);
db.VehicleType = require('../models/vehicle_types.js')(sequelize, Sequelize);
db.Logs = require('../models/logs.js')(sequelize, Sequelize);
db.Subscribers = require('../models/subscribers.js')(sequelize, Sequelize);
db.vehicle_to_features = require('../models/vehicle_to_features.js')(sequelize, Sequelize);
db.vehicle_to_guidelines = require('../models/vehicle_to_guidelines.js')(sequelize, Sequelize);
module.exports = db;