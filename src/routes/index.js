const express = require('express');

const router = express.Router();
const lessonRoutes = require('./lesson');
const teacherRoutes = require('./teacher');

router.use('/lesson', lessonRoutes);
router.use('/teacher', teacherRoutes);

// error handling
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status);
  res.json({
    status,
    error: {
      message: err.message,
    },
  });
});


module.exports = router;
