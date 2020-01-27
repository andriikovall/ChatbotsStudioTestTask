const shortid = require('shortid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  login: { type: String, required: true },
  passwordHash: { type: String, required: true },
}, { versionKey: false });

const userModel = new mongoose.model('user', userSchema);

module.exports = userModel;
