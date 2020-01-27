module.exports.createNotFoundResponse = function (entity, property, value) {
  const data = {};
  data[property] = value;
  return {
    message: `${entity} with such ${property} not found`,
    data,
  };
};
