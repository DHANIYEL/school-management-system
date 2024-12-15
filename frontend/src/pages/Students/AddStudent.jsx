import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axiosInstance.post('/students', formData);
      setSuccess('Student added successfully!');
      setTimeout(() => navigate('/students'), 2000); // Redirect to student list
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Add Student</h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter student's name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter student's email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter student's phone"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Grade */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Grade</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
              placeholder="Enter student's grade"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Enter student's address"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Student
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mt-4 text-green-500 text-sm">
            <p>{success}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
