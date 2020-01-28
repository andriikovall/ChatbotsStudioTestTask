const groupModel = require('../../models/group');
const studentModel = require('../../models/student');

const populateConfig = { path: 'students', model: studentModel };

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
