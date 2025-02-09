import React from 'react';

const AttendeesList = ({ attendees, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg max-w-lg w-full">
        <h3 className="text-2xl font-bold text-white mb-4">Attending People</h3>
        {attendees.length > 0 ? (
          <ul className="space-y-2">
            {attendees.map((attendee, index) => (
              <li key={index} className="text-gray-300">{attendee}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No one is attending yet.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AttendeesList;
