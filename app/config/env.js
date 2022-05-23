
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
  EMAIL_ACCESS_TOKEN: 'ya29.a0ARrdaM-Fyo5b43DLY1iyS3EsEdAtSmtjqvzqMfHHwejWkfc11gzy1QpY5_X7Y_WaSrYmUP_GqkdmryDpFbiWNe4w13gTiFlao3IObYefliClFxwFllWwCZLX_E0-PXeW3DKhgvCu1kWeRwcK53qnYBYWZ9RS',
  SCOPE_SERVER: 'https://mail.google.com/',
  REFRESH_TOKEN:'1//04tTE0dJlmHhXCgYIARAAGAQSNwF-L9IrQjf5CpoVtDNeRTa4Ah7ASfUtpgJcvMGc_J2BvSitDyhMqKlake_BmpA6RL-ljJE6fLU',
  TOKEN_TYPE:'Bearer',
  EXPIRES_IN:3599,
  AUTHORIZATION_CODE:'4/0AX4XfWjQ1cwlLrx-2wNaBXa-5jbdw_Dj7NvH_i2I76MWTCqnxAR2KYQ93W8NLozxpQN4HQ',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;