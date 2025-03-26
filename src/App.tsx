import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Weather from './components/Weather';
import Auth from './components/Auth';
import { logout, restoreSession } from './store/slices/authSlice';
import type { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, username } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {username}!
            </h1>
            <Weather />
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-lg focus:outline-none"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
        <div className="space-y-6">
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;