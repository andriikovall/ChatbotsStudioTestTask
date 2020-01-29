const userModel = require('../../models/user');

module.exports.getById = function (id) {
  return userModel.findById(id);
};

module.exports.getByLoginAndPasswordHash = function (login, passwordHash) {
  return userModel.findOne({ login, passwordHash });
};

module.exports.getByLogin = function (login) {
  return userModel.findOne({ login });
};

module.exports.insert = function (user) {
  return new userModel(user).save();
};
