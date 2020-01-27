const express = require('express');

const router = express.Router();
const lessonRoutes = require('./lesson/index');

router.use('/lesson', lessonRoutes);

// error handling
router.use((err, req, res) => {
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
