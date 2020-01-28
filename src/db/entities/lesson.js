const lessonModel = require('../../models/lesson');

const teacherModel = require('../../models/teacher');

module.exports.getById = function (id) {
  return lessonModel.findById(id).populate({
    path: 'teacher', model: teacherModel,
    // @todo another
  });
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
