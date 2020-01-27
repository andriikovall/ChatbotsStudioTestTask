
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use('/', routes);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
