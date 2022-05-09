const db = require('../config/db.config.js');
const Logs = db.Logs;
 logging = (controller,method,type,message) =>{
            let log = {};
            log.controller = controller;
            log.method = method;
            log.type = type;
            log.description =message;
            Logs.create(log).then(results =>{
            });
};
module.exports = logging;