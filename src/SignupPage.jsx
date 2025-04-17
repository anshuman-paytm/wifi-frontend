import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/signup', { email, password });
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed. Try again.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <form onSubmit={handleSignUp} className="mt-4">
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
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>
        </div>
      </form>
      <div className="mt-4">
        <span>Already have an account? </span>
        <button onClick={() => navigate('/login')} className="text-blue-600 underline">Login</button>
      </div>
    </div>
  );
};

export default SignupPage;
