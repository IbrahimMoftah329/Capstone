const User = require('../models/user');
const mongoose = require('mongoose');

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

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

// create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// delete a user
const deleteUser = async (req, res) => {
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
};

// In userControllers.js
const modifyUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  modifyUser,  // Changed from updateUser
};