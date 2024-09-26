const mongoose = require('mongoose')

const Schema = mongoose.Schema
const topicSchema = require('./topic'); // Import the topic schema


const classSchema = new Schema({
    className: {
      type: Number,
      enum: [260, 340, 265, 275],  // Restricting to allowed values
      required: true
    },
    topics: [topicSchema]
  });
 
module.exports = classSchema;