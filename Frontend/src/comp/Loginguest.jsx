import React, { useEffect, useState } from 'react';

// The Event Dashboard view with filters and list of events
const EventDashboardView = ({
  events,
  onAttend,
  filterCategory,
  setFilterCategory,
  filterDate,
  setFilterDate,
}) => {
  const today = new Date();

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const categoryMatch = filterCategory ? event.category === filterCategory : true;
    let dateMatch = true;
    if (filterDate === 'upcoming') {
      dateMatch = eventDate >= today;
    } else if (filterDate === 'past') {
      dateMatch = eventDate < today;
    }
    return categoryMatch && dateMatch;
  });

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
          <div key={event.id} className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-white">{event.name}</h3>
            <p className="text-gray-300 mt-2">{event.description}</p>
            <p className="text-gray-400 mt-2">
              Date: {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-gray-400 mt-2">Category: {event.category}</p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => onAttend(event.id)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-200"
              >
                Attend
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

// Main LoginGuest component (without event creation)
const Loginguest = () => {
  const [events, setEvents] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events/guestEvents');
        const data = await res.json(); // Parsing JSON response
        const eventsData = data.map((event) => ({
          id: event._id,
          name: event.name,
          description: event.description,
          date: event.date,
          category: event.category,
          attendees: event.attendees,
          creator: event.createdBy,
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAttend = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, attendees: event.attendees + 1 } : event
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 p-6">
        <h2 className="text-2xl font-bold text-white mb-8">Event Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => {}}
                className="w-full text-left px-4 py-2 rounded-md bg-indigo-600 text-white transition duration-200"
              >
                Event Dashboard
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <EventDashboardView
          events={events}
          onAttend={handleAttend}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
        />
      </main>
    </div>
  );
};

export default Loginguest;
