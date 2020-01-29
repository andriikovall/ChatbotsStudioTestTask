const express = require('express');
const controllers = require('../controllers/group');

const router = express.Router();

router.get('/:id', controllers.getById);
router.get('/search', controllers.get);
router.delete('/:id', controllers.delete);
router.put('/:id', controllers.update);
router.post('/new', controllers.insert);
router.post('/:id/addStudents', controllers.checkBodyForStudents, controllers.addStudents);
router.post('/:id/removeStudents', controllers.checkBodyForStudents, controllers.removeStudents);

module.exports = router;
