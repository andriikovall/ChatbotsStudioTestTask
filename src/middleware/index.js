const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(morgan('dev'));

module.exports = router;
