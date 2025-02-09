const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const getUsers = async (req,res) => {
    try {
        // Fetch all users, but exclude their passwords
        const users = await User.find({});

        // Return the list of users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const me = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.find({ email: email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = {getUsers,me};