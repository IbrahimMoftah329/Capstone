const express  = require('express')
const router = express.Router()


const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../Controllers/userControllers')




// Route to GET all users
router.get('/', getUsers)

// Route to GET a single user 
router.get('/:userId', getUser)

// Route to POST/ ADD a new user
router.post('/', createUser)

// Route to DELETE a user
router.delete('/:userId', deleteUser)

// Route to UPDATE a user
router.patch('/:userId', updateUser)

module.exports = router
