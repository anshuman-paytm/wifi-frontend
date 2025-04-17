import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();  // useNavigate hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save token in localStorage
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/signup', { email, password });
      navigate('/dashboard');  // Redirect to dashboard after successful signup
    } catch (err) {
      setError('Error during signup. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">Welcome to Paytm</h2>

      <form className="mt-4" onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </div>
      </form>

      <div className="mt-4">
        <button onClick={handleSignUp} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
