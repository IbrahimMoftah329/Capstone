const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSchema = require('./class'); // Import the class schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  campus: { type: String, required: true },
  major: { type: String, required: true },
  classes: [classSchema] // Reference to the class schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
