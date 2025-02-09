const express = require('express');
const router = express.Router();
const { registerUser, loginUser ,logoutUser} = require('../controllers/auth');

// Register new user
router.post('/register', registerUser);

// Login existing user
router.post('/login', loginUser);


//logout
router.get('/logout', logoutUser);
module.exports = router;
