const mongoose = require('mongoose')

const Schema = mongoose.Schema


const classSchema = new Schema({
    className: {
      type: Number,
      enum: [260, 340, 265, 275, 135, ],  // Restricting to allowed values
      required: false
    },
  });
 
module.exports = classSchema;