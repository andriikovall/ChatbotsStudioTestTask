const groupModel = require('../../models/group');
const studentModel = require('../../models/student');

const populateConfig = { path: 'students', model: studentModel };

module.exports.get = function ({ specialisationCode, limit = 10, offset = 0 }) {
  const predicate = {};
  if (specialisationCode != null) {
    predicate.specialisationCode = specialisationCode;
  }
  const promises = [
    groupModel.countDocuments(predicate),
    groupModel.find(predicate).limit(limit).skip(offset)
  ];
  return Promise.all(promises).then(([count, groups]) => ({
    count, groups,
  }));
};

module.exports.getById = function (id) {
  return groupModel.findById(id)
    .populate(populateConfig);
};

module.exports.insert = function (group) {
  return new groupModel(group).save();
};

module.exports.deleteById = function (id) {
  return groupModel.findByIdAndDelete(id)
    .populate(populateConfig);
};

module.exports.update = function (group) {
  return groupModel.findOneAndUpdate({ _id: group._id }, { $set: group }, { new: true })
    .populate(populateConfig);
};

module.exports.addStudents = function (_id, students) {
  return groupModel.findOneAndUpdate({ _id }, {
    $push: { students: { $each: students } },
  }, { new: true });
};

module.exports.removeStudents = function (_id, students) {
  return groupModel.findOneAndUpdate({ _id }, {
    $pull: { students: { $in: students } },
  }, { new: true });
};
