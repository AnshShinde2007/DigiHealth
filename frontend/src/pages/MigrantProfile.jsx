import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
const MigrantProfile = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Migrant Profile Management</h1>

      {/* Personal Information Section */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Country of Origin</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
          </div>
        </form>
      </div>

      {/* Health Records Section */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Health Records</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Allergies</label>
            <textarea className="w-full p-2 border rounded"></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Current Medications</label>
            <textarea className="w-full p-2 border rounded"></textarea>
          </div>
        </form>
      </div>

      {/* Notes and Symptoms Section */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Notes and Symptoms</h2>
        <form>
          <textarea className="w-full p-2 border rounded" rows="5"></textarea>
        </form>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button className="bg-blue-500"></button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Profile
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Download Case Summary
        </button>
      </div>
    </div>
  );
};

export default MigrantProfile;
