import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Events from './Events';
import CreateEvent from './CreateEvent';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'create', or 'attendees'
  const [attendees, setAttendees] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
      if (res.status === 200) {
        console.log(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (activeTab === 'attendees') {
      fetchAttendees();
    }
  }, [activeTab]);

  const fetchAttendees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendees/live', { withCredentials: true });
      setAttendees(res.data); // Assuming API returns an array of { userName, eventName }
    } catch (error) {
      console.error('Failed to fetch attendees:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 p-6 relative">
        <h2 className="text-2xl font-bold text-white mb-8">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'dashboard' ? 'bg-indigo-600' : 'bg-gray-800'
                } text-white hover:bg-indigo-700`}
              >
                Events
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('create')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'create' ? 'bg-indigo-600' : 'bg-gray-800'
                } text-white hover:bg-indigo-700`}
              >
                Create Event
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('attendees')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'attendees' ? 'bg-indigo-600' : 'bg-gray-800'
                } text-white hover:bg-indigo-700`}
              >
                Attendees
              </button>
            </li>
          </ul>
        </nav>
        {/* Logout Button at the Bottom Left */}
        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === 'dashboard' && <Events />}
        {activeTab === 'create' && <CreateEvent />}
        {activeTab === 'attendees' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Live Attendees</h2>
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              {attendees.length > 0 ? (
                <ul className="space-y-4">
                  {attendees.map((attendee, index) => (
                    <li key={index} className="text-white">
                      <strong>{attendee.userName}</strong> is attending <em>{attendee.eventName}</em>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No live attendees at the moment.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
