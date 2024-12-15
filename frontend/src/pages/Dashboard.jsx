import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // If no token exists, redirect to the login page
  if (!token) {
    navigate('/login');
    return null;
  }

  // // Function to decode JWT token manually
  // const decodeToken = (token) => {
  //   const payload = token.split('.')[1];  // Get the payload part (second part of the token)
  //   const decodedPayload = atob(payload); // Base64 decode the payload
  //   return JSON.parse(decodedPayload);   // Parse the JSON string to an object
  // };

  // // Decode token and get the role
  // const { role } = decodeToken(token);  

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* Student Management */}
  <button
    className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600"
    onClick={() => navigate('/students/add')}
  >
    Add Student
  </button>
  <button
    className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600"
    onClick={() => navigate('/students')}
  >
    Manage Students
  </button>

  {/* User Management */}
  <button
    className="bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-600"
    onClick={() => navigate('/users')}
  >
    Manage Users
  </button>

  {/* Library Management */}
  <button
    className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600"
    onClick={() => navigate('/library')}
  >
    Manage Library
  </button>

  {/* Fees Management */}
  <button
    className="bg-teal-500 text-white py-3 px-6 rounded-md hover:bg-teal-600"
    onClick={() => navigate('/fees')}
  >
    Manage Fees
  </button>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
