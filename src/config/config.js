require('dotenv').config();

module.exports = {
  DB_URL_TEMPLATE: process.env.DB_URL_TEMPLATE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
