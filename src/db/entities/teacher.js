const teacherModel = require('../../models/teacher');

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
