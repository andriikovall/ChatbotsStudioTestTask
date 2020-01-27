const mongoose = require('mongoose');
const shortid = require('shortid');

const lessonSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: { type: String, required: true },
  teacher: { type: String, required: true },
  group: { type: String, required: true },
  place: { type: String, required: true },
  indexNumber: { type: String, required: true }
});

const lessonModel = new mongoose.model('cart', lessonSchema);

module.exports = lessonModel;
