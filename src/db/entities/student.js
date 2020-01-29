const studentModel = require('../../models/student');
const groupModel = require('../../models/group');

const escareRegExp = require('../../utils/escape-regexpr');

const populateConfig = { path: 'group', model: groupModel };

module.exports.get = function (filters, limit, offset) {
  const regExprEscapedName = escareRegExp(filters.name || '');
  const nameSearch = new RegExp(regExprEscapedName, 'i');
  return studentModel.find({ ...filters, name: nameSearch }).limit(limit || 10).skip(offset || 0);
};

module.exports.getById = function (id) {
  return studentModel.findById(id)
    .populate(populateConfig);
};

module.exports.insert = function (st) {
  return new studentModel(st).save();
};

module.exports.deleteById = function (id) {
  return studentModel.findByIdAndDelete(id)
    .populate(populateConfig);
};

module.exports.update = function (st) {
  return studentModel.findOneAndUpdate({ _id: st._id }, { $set: st }, { new: true })
    .populate(populateConfig);
};

module.exports.addStudentsToGroup = function (students, groupId) {
  const updates = students.map(s => studentModel.findByIdAndUpdate(s, { group: groupId }));
  return Promise.all(updates);
};

module.exports.removeStudentsFromGroup = function (students) {
  const updates = students.map(s => studentModel.findByIdAndUpdate(s, { group: null }));
  return Promise.all(updates);
};
