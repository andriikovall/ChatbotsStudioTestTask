const express = require('express');
const controllers = require('../controllers/teacher');

const router = express.Router();

router.get('/:id', controllers.getById);
router.get('/search', controllers.get);
router.delete('/:id', controllers.delete);
router.put('/:id', controllers.update);
router.post('/new', controllers.insert);


module.exports = router;
