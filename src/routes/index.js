const express = require('express');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();

const authRoutes = require('./auth');
const lessonRoutes = require('./lesson');
const teacherRoutes = require('./teacher');
const studentRoutes = require('./student');
const groupRoutes = require('./group');

const errorControllers = require('../controllers/error');

/**
 * The order is crucial for auth logic
 */
router.use('/auth', authRoutes);
router.use(checkAuth);
router.use('/lesson', lessonRoutes);
router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);
router.use('/group', groupRoutes);

router.use(errorControllers.errorHandler);
router.use(errorControllers.notFoundRouteHandler);


module.exports = router;
