const express = require('express');
const controllers = require('../controllers/student');

const router = express.Router();

router.get('/search', controllers.get);
router.get('/:id', controllers.getById);
router.delete('/:id', controllers.delete);
router.put('/:id', controllers.update);
router.post('/new', controllers.insert);

module.exports = router;
