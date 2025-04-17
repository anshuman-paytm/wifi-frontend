import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="mt-4">
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
        <span>New user? </span>
        <button onClick={() => navigate('/signup')} className="text-blue-600 underline">Sign up</button>
      </div>
    </div>
  );
};

export default LoginPage;
