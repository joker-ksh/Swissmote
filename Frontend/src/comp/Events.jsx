import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate hook

const Events = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [toggle, setToggle] = useState({}); // Store toggle state per event

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events/allEvents', { withCredentials: true });
        const events = res.data.map((event) => ({
          id: event._id,
          name: event.name,
          description: event.description,
          date: event.date,
          category: event.category,
          attendees: event.attendees,
          creator: event.createdBy,
        }));
        setEvents(events);
      } catch (e) {
        console.error(e);
      }
    };

    fetchEvents();
  }, []);  // Fetch events only once when component mounts

  // Filter events based on selected filters
  useEffect(() => {
    let filtered = events;

    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter((event) => event.category === filterCategory);
    }

    // Filter by date (upcoming or past)
    if (filterDate === 'upcoming') {
      filtered = filtered.filter((event) => new Date(event.date) > new Date());
    } else if (filterDate === 'past') {
      filtered = filtered.filter((event) => new Date(event.date) < new Date());
    }

    setFilteredEvents(filtered);
  }, [filterCategory, filterDate, events]);

  // Handle attending an event (add current user to attendees list)
  const handleAttend = async (eventId) => {
    setToggle((prev) => ({
      ...prev,
      [eventId]: prev[eventId] === 'Attend' ? 'Attending' : 'Attend', // Toggle between Attend and Attending
    }));
    console.log(`Attending People for Event ID: ${eventId}`);
  };

  // Handle deleting an event
  const handleDelete = (eventId) => {
    console.log(`Event with ID: ${eventId}`);
    try {
      axios.delete(`http://localhost:5000/api/events/delete/${eventId}`, { withCredentials: true });
      const newEvents = events.filter((event) => event.id !== eventId);
      setEvents(newEvents);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Dates</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col space-y-4 relative">
            <h3 className="text-2xl font-bold text-white">{event.name}</h3>
            <p className="text-gray-300 mt-2">{event.description}</p>
            <p className="text-gray-400 mt-2">
              Date: {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-gray-400 mt-2">Category: {event.category}</p>
            <p className="text-gray-400 mt-2">Created by: {event.creator}</p>
            <p className="text-gray-400 mt-2">Attendees: {event.attendees}</p>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleDelete(event.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => handleAttend(event.id)}
                className="px-4 py-2 bg-green-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
              >
                {toggle[event.id] || 'Attend'}
              </button>
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <p className="text-center text-white col-span-full">
            No events found for selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
