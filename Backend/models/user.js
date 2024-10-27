const mongoose = require('mongoose')

const Schema = mongoose.Schema



const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: { 
    type: String, 
    // required: true, 
    unique: true 
  },
  university: { 
    type: String, 
    // required: true 
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

userSchema.statics.findOrCreateUserByClerkId = async function (clerkId) {
  // Attempt to find the document
  let user = await this.findOne({ clerkId });
  
  // If document is found, return it
  if (user) return user;

  // If document is not found, create it
  user = new this({ clerkId });
  await user.save();
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;