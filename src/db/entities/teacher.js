const teacherModel = require('../../models/teacher');

const escareRegExp = require('../../utils/escape-regexpr');


module.exports.get = function (filters, limit, offset) {
  const regExprEscapedName = escareRegExp(filters.name || '');
  const nameSearch = new RegExp(regExprEscapedName, 'i');
  const predicate = { ...filters, name: nameSearch };
  const promises = [
    teacherModel.countDocuments(predicate),
    teacherModel.find(predicate).limit(limit || 10).skip(offset || 0),
  ];
  return Promise.all(promises).then(([count, teachers]) => ({
    count, teachers,
  }));
};

module.exports.getById = function (id) {
  return teacherModel.findById(id);
};

module.exports.insert = function (teacher) {
  return new teacherModel(teacher).save();
};

module.exports.deleteById = function (id) {
  return teacherModel.findByIdAndDelete(id);
};

module.exports.update = function (teacher) {
  return teacherModel.findOneAndUpdate({ _id: teacher._id }, { $set: teacher }, { new: true });
};
