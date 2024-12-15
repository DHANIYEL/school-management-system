import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'; // Import Register page
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import StudentList from './pages/Students/StudentList';
import AddStudent from './pages/Students/AddStudent'; // Import AddStudent component
import './index.css'

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer /> {/* Add Toast Container */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Add Register route */}

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <StudentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <PrivateRoute>
                <AddStudent />
              </PrivateRoute>
            }
          /> {/* Add AddStudent route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
