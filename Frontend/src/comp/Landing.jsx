import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center bg-gray-900 bg-opacity-75 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to EventManager</h1>
        <p className="text-gray-300 mb-6">
          Discover, create, and manage events seamlessly. Connect with like-minded individuals, attend exciting events, and keep track of upcoming gatherings.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup" // Assuming you have a route for registration
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
          >
            Register
          </Link>
          <Link
            to="/guest" // Assuming you have a guest login route
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-200"
          >
            Guest Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
