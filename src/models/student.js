const shortid = require('shortid');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true },
  group: { type: String, default: null, ref: 'Group' },
}, { versionKey: false });


const studentModel = new mongoose.model('student', studentSchema);

module.exports = studentModel;
