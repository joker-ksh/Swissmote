import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]); // Assuming you'll fetch events here

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    // Fetch events when the component mounts
    const fetchEvents = async () => {
      try {
        const res = await axios.get('https://swissmote-ydck.onrender.com/api/events');
        if (res.status === 200) {
          setEvents(res.data); // Assuming the data contains an array of events
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!eventName || !description || !dateTime || !category) {
      setError('Please fill in all fields');
      return;
    }
    const newEvent = {
      name: eventName,
      description,
      date: dateTime,
      category,
      attendees: 0,
      email: email,
    };

    // Send the new event data to the server
    try {
      const res = await axios.post('https://swissmote-ydck.onrender.com/api/events/create', newEvent, { withCredentials: true });
      if (res.status === 201) {
        console.log('Event created successfully');
        setEvents([...events, res.data]); // Add the new event to the list
      } else {
        setError('Failed to create event');
      }
    } catch (err) {
      setError('Error creating event: ' + err.message);
    }

    // Reset form fields
    setEventName('');
    setDescription('');
    setDateTime('');
    setCategory('');
  };

  const handleDelete = (eventId) => {
    console.log('Deleting event with ID:', eventId); // Logs the event ID when the delete button is clicked
    // You can also send a request to delete the event from the server if needed:
    // try {
    //   await axios.delete(`https://swissmote-ydck.onrender.com/api/events/${eventId}`);
    //   setEvents(events.filter(event => event.id !== eventId)); // Remove the event from the list
    // } catch (err) {
    //   console.error('Error deleting event:', err);
    // }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-white mb-6">
        Create New Event
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-300">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
            className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="dateTime" className="block text-sm font-medium text-gray-300">
            Date & Time
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-200"
        >
          Create Event
        </button>
      </form>

      
    </div>
  );
};

export default CreateEvent;
