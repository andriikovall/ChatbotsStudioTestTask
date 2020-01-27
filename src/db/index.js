const mongoose = require('mongoose');
const { DB_URL_TEMPLATE, DB_USERNAME, DB_PASSWORD } = require('../config/config');

function connectToDB(cb) {
  const dbUrl = DB_URL_TEMPLATE
    .replace('<username>', DB_USERNAME)
    .replace('<password>', DB_PASSWORD);

  mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, cb);
}


module.exports = connectToDB;
