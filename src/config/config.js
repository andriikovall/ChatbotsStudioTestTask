require('dotenv').config();

module.exports = {
  DB_URL_TEMPLATE: process.env.DB_URL_TEMPLATE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SALT: process.env.SALT || 'supersecret,rlv,d;lvdf,',
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret.ksklslmfskmlvfmkl',
};
