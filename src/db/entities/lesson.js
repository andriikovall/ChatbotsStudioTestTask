const lessonModel = require('../../models/lesson');
const teacherModel = require('../../models/teacher');
const groupModel = require('../../models/group');


module.exports.get = function (filters, limit, offset) {
  const promises = [
    lessonModel.countDocuments(filters),
    lessonModel.find(filters).limit(limit || 10).skip(offset || 0),
  ];
  return Promise.all(promises).then(([count, lessons]) => ({
    count, lessons,
  }));
};

module.exports.getById = function (id) {
  return lessonModel.findById(id)
    .populate({ path: 'teacher', model: teacherModel })
    .populate({ path: 'groups', model: groupModel });
};

module.exports.insert = function (lesson) {
  return new lessonModel(lesson).save();
};

module.exports.deleteById = function (id) {
  return lessonModel.findByIdAndDelete(id);
};

module.exports.update = function (lesson) {
  return lessonModel.findOneAndUpdate({ _id: lesson._id }, { $set: lesson }, { new: true });
};
