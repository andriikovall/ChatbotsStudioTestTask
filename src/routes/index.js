const express = require('express');

const router = express.Router();
const lessonRoutes = require('./lesson/index');

router.use('/lesson', lessonRoutes);

module.exports = router;
