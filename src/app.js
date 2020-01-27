
const express = require('express');
const routes = require('./routes/index');
const middleware = require('./middleware/index');
const connectToDB = require('./db/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', middleware);
app.use('/', routes);

connectToDB((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('connected to DB. Strating server...');
    app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
  }
});
