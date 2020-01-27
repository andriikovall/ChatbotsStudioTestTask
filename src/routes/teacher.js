const express = require('express');
const controllers = require('../controllers/teacher');

const router = express.Router();

router.get('/:id', controllers.getById);
router.delete('/:id', controllers.delete);
router.post('/new', controllers.insert);
router.put('/:id', controllers.update);


module.exports = router;