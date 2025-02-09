const express = require('express');
const {createEvent,allEvents,deleteEvent} = require('../controllers/event');
const protect = require('../middleware/auth')
const router = express.Router();


router.post('/create',protect, createEvent);
router.get('/allEvents',protect, allEvents);
router.delete('/delete/:id',protect, deleteEvent);
router.get('/guestEvents', allEvents);


module.exports = router;
