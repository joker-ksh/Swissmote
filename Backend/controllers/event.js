// events.js
const Event = require('../models/event');
const createEvent = async (req, res) => {
  try {
    const { name, description, date, category, attendees, email } = req.body;
    const createdBy = email;
    const newEvent = new Event({
      name,
      description,
      date,
      category,
      attendees,
      createdBy
    });
    await newEvent.save();


    res.status(201).json({ message: "Event created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const allEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
    
module.exports = { createEvent, allEvents, deleteEvent};
