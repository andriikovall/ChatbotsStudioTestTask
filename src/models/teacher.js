const mongoose = require('mongoose');
const shortid = require('shortid');

const teacherSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  worksSince: { type: Date, default: Date.now }
});

const teacherModel = new mongoose.model('cart', teacherSchema);

module.exports = teacherModel;
