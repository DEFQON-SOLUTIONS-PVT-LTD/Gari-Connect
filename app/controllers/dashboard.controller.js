const db = require('../config/db.config.js');
const { messages } = require('../common/messages');
const crypto = require('crypto');

//const Op = db.Sequelize.Op;
exports.getDashboardData = (req, res, next) => {

    db.sequelize.query('CALL get_dashboardData(); FETCH ALL FROM "rs_resultone";', res, next)
        .then(result => {
            res.status(200).json({
                message: " Get all Dashboard Infos Successfully! ",
                result: result[0],
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