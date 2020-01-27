const mongoose = require('mongoose');
const shortid = require('shortid');

const lessonSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true },
  teacher: { type: String, required: true, ref: 'Teacher' },
  group: { type: String, required: true, ref: 'Group' },
  place: { type: String, required: true },
  indexNumber: { type: String, required: true },
});

const lessonModel = new mongoose.model('lesson', lessonSchema);

module.exports = lessonModel;
