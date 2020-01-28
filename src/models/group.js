const shortid = require('shortid');
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true, unique: true },
  students: [{ type: String, required: true, ref: 'Student' }],
  specialisationCode: { type: Number, required: true, unique: true },
}, { versionKey: false });

const groupModel = new mongoose.model('group', groupSchema);

module.exports = groupModel;
