import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircle, Cloud } from 'lucide-react';
import { addTask } from '../store/slices/tasksSlice';
import type { Task } from '../types';

const TaskInput: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [isOutdoor, setIsOutdoor] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      isOutdoor,
    };

    dispatch(addTask(newTask));
    setTitle('');
    setPriority('medium');
    setIsOutdoor(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="button"
          onClick={() => setIsOutdoor(!isOutdoor)}
          className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 ${
            isOutdoor
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'border-gray-300 text-gray-700'
          }`}
        >
          <Cloud size={20} />
          Outdoor
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskInput;