const mongoose = require('mongoose');
const { DB_URL_TEMPLATE, DB_USERNAME, DB_PASSWORD } = require('../config/config');


const dbUrl = DB_URL_TEMPLATE
  .replace('<username>', DB_USERNAME)
  .replace('<password>', DB_PASSWORD);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to mongoDB'))
  .catch(err => console.log(`Mongo connection error: ${err}`));
