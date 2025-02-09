const express = require('express');
const router = express.Router();

const {getUsers,me} = require('../controllers/users');
const protect = require('../middleware/auth');

router.get('/all',protect,getUsers);

router.get('/me',protect,me);

module.exports = router;