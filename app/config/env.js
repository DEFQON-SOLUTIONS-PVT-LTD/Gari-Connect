
const env = {
  database: 'postgres',
  username: 'postgres',
  password: '12345',
  host: 'localhost',
  dialect: 'postgres',
  secretkey: 'iWillDoItNow',
  TWILIO_ACCOUNT_SID: 'AC1053c43c77f208071cbfd3bdd954cfc9',
  TWILIO_ACCOUNT_SID_TEST: 'ACc39799c92784945da676ed505aded02e',
  TWILIO_AUTH_TOKEN: 'acf1137fe81e881a9754f271cb1d80ec',
  TWILIO_AUTH_TOKEN_TEST: 'fe71712595c043eb4321aed5a553da05',
  TWILIO_PHONE_NUMBER: '+12185178531',
  TWILIO_WHATSAPP_NUMBER: '+14155238886',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;