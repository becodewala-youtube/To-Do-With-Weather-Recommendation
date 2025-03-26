import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LogIn } from 'lucide-react';
import { login } from '../store/slices/authSlice';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    dispatch(login({ username: username.trim() }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
          <p className="mt-2 text-gray-600">Sign in to access your tasks</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogIn size={20} />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;