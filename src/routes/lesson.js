const express = require('express');
const controllers = require('../controllers/lesson');

const router = express.Router();

router.get('/:id', controllers.getById);
router.delete('/:id', controllers.delete);
router.put('/:id', controllers.update);
router.post('/new', controllers.insert);

module.exports = router;