const shortid = require('shortid');
const mongoose = require('mongoose');


const lessonSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true }, // id
  teacher: { type: String, required: true, ref: 'Teacher' },
  group: { type: [String], default: [], ref: 'Group' },
  place: { type: String, default: 'not selected yet' },
  indexNumber: { type: Number, default: -1 },
}, { versionKey: false });

const lessonModel = new mongoose.model('lesson', lessonSchema);

module.exports = lessonModel;
