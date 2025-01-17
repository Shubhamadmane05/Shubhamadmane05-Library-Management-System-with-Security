import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  let navigate = useNavigate();

 
  const validateInputs = () => {
   
    if (username.length < 5) {
      setMessage('Username must be at least 5 characters long.');
      return false;
    }

   
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage(
        'Password must be at least 8 characters long, contain an uppercase letter, and a number.'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await fetch('http://localhost:8080/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setMessage(data.message || 'Sign up failed.');
      }
    } catch (error) {
      setMessage('username already taken');
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10 backdrop-blur">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          {message && <div className="text-center mb-4 text-red-500">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <span>Have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
