import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
    <div className="mt-4 text-center">
      <p className="text-gray-600">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Register
        </a>
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;
