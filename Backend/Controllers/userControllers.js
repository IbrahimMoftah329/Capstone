const User = require('../models/user')

const mongoose = require('mongoose')


// get all users
const getUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

// get a single user
const getUser = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid object ID"})
    }

    const userByID = await User.findById(id)

    if(!userByID){
        res.status(404).json({error: "no such user exists"})
    }

    res.status(200).json(userByID)
}

// create a new user
const createUser = async (req, res) => {
    const {username,university, decks, topicName} = req.body

    try{
        const user = await User.create({username, university, decks, topicName})

        res.status(200).json(user)

    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a user
const deleteUser = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid object ID"})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user){
        res.status(404).json({error: "no such user exists"})
    }

    res.status(200).json(user)
}

// update a user
const updateUser = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid object ID"})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user){
        res.status(404).json({error: "no such user exists"})
    }

    res.status(200).json(user)
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}