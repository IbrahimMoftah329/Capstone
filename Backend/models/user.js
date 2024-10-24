const mongoose = require('mongoose')

const Schema = mongoose.Schema



const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  university: { 
    type: String, 
    required: true 
  },
  major: { 
    type: String, 
    required: false 
  },
  decks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  }],

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;