const shortid = require('shortid');
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  worksSince: { type: Date, default: Date.now },
}, { versionKey: false });

const teacherModel = new mongoose.model('teacher', teacherSchema);

module.exports = teacherModel;
