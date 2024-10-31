const User = require('../models/user')

const mongoose = require('mongoose')


// get all users
const getUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

// get a single user
const getUser = async(req, res) => {
    const { userId: clerkId } = req.params;

    try {
      const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
}

// create a new user
const createUser = async (req, res) => {

    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).send(err.message);
      }
}

// delete a user
const deleteUser = async(req, res) => {

    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).send(err.message);
  }

}

// update a user
const updateUser = async (req, res) => {
  const { userId: clerkId } = req.params;

  try {
      // Find or create the user by clerkId
      let user = await User.findOrCreateUserByClerkId(clerkId, req.body);

      // Update the user with new data
      Object.assign(user, req.body);
      await user.save();

      res.status(200).json(user);
  } catch (err) {
      res.status(500).send(err.message);
  }
};


module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}