const { createNotFoundResponse } = require('../utils/not-found-response');

// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = function (err, req, res, next) {
  const status = err.status || 500;
  res.status(status);
  res.json({
    status,
    error: {
      message: err.message,
    },
  });
};

module.exports.notFoundRouteHandler = function (req, res) {
  res.status(404).json(createNotFoundResponse('Route', 'path', req.path));
};
