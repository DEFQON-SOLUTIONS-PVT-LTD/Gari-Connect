
const env = {
  database: 'GariConnect',
  username: 'postgres',
  password: '@dmin123',
  host: '147.182.142.123',
  dialect: 'postgres',
  secretkey: 'iWillDoItNow',
  TWILIO_ACCOUNT_SID: 'AC1053c43c77f208071cbfd3bdd954cfc9',
  TWILIO_ACCOUNT_SID_TEST: 'ACc39799c92784945da676ed505aded02e',
  TWILIO_AUTH_TOKEN: 'acf1137fe81e881a9754f271cb1d80ec',
  TWILIO_AUTH_TOKEN_TEST: 'fe71712595c043eb4321aed5a553da05',
  TWILIO_PHONE_NUMBER: '+12185178531',
  TWILIO_WHATSAPP_NUMBER: '+14155238886',
  SMTP_USERNAME_TEST: "test@ifc.com.pk",
  SMTP_HOSTNAME_TEST: "mail.ifc.com.pk",
  SMTP_PASSWORD_TEST: "q{V}v}Kruf1z",
  SMTP_PORT_TEST: 465,

  SMTP_USERNAME_LIVE: "connect@gariconnect.com",
  SMTP_HOSTNAME_LIVE: "104.248.56.159",
  SMTP_PASSWORD_LIVE: "P@ssw0rd@123",
  SMTP_PORT_LIVE: 587,

  WEBTITLE: "Gari Connect",
  EMAIL_ADMIN: "connect@gariconnect.com",
  EMAIL_MANAGER: "junaid.dev.techinoid@gmail.com",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;