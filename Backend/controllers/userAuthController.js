const User = require('../models/User');

// Controller function to get user information
const getUser = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findOne({ clerkId: userId });
    if (user) {
      res.json({ message: 'Authenticated successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getUser };
