const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const morgan = require('morgan');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(morgan('dev'));

module.exports = router;
