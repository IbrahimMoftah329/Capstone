// require('dotenv').config({ path: '.env.local' });  // Explicitly load .env.local file
// const mongoose = require('mongoose');
// const User = require('./models/user');  // Ensure this path is correct for your User model

// // Use the MONGO_URI from your .env.local file
// const mongoURI = process.env.MONGO_URI;

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('Connected to MongoDB');

//     // Update all users to ensure they have the new fields (empty arrays by default)
//     await User.updateMany(
//       {},
//       { 
//         $set: {
//           favoritedDecks: [],   // Add empty array for favoritedDecks
//           favoritedQuizzes: []  // Add empty array for favoritedQuizzes
//         }
//       }
//     );

//     console.log('All users have been updated with the new fields.');
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error('Error updating users:', err);
//     mongoose.disconnect();
//   });



require('dotenv').config({ path: '.env.local' });  // Explicitly load .env.local file
const mongoose = require('mongoose');
const User = require('./models/user');  // Ensure this path is correct for your User model

// Use the MONGO_URI from your .env.local file
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Update all users to ensure they have the new fields (empty arrays by default)
    const updateResult = await User.updateMany(
      {},
      { 
        $set: {
          favoritedDecks: [],   // Add empty array for favoritedDecks
          favoritedQuizzes: []  // Add empty array for favoritedQuizzes
        }
      }
    );

    console.log('Update result:', updateResult);

    if (updateResult.modifiedCount === 0) {
      console.log('No documents were updated.');
    } else {
      console.log('All users have been updated with the new fields.');
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error updating users:', err);
    mongoose.disconnect();
  });
