
const env = {
  database: 'postgres',
  username: 'postgres',
  password: '12345',
  host: 'localhost',
  dialect: 'postgres',
  secretkey: 'iWillDoItNow',
  TWILIO_ACCOUNT_SID: 'AC1053c43c77f208071cbfd3bdd954cfc9',
  TWILIO_AUTH_TOKEN: 'acf1137fe81e881a9754f271cb1d80ec',
  TWILIO_PHONE_NUMBER: '+12185178531',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;