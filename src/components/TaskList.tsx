import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, CheckCircle, Circle, Cloud, Sun, CloudRain, CloudLightning } from 'lucide-react';
import { removeTask, toggleTask } from '../store/slices/tasksSlice';
import type { RootState } from '../store';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const weather = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getWeatherIcon = () => {
    if (weather.loading) return <Cloud className="animate-pulse" />;
    if (weather.error) return <CloudRain className="text-red-500" />;
    
    switch (weather.description.toLowerCase()) {
      case 'clear':
        return <Sun className="text-yellow-500" />;
      case 'clouds':
        return <Cloud className="text-gray-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="text-blue-500" />;
      case 'thunderstorm':
        return <CloudLightning className="text-purple-500" />;
      default:
        return <Cloud className="text-gray-500" />;
    }
  };

  const getWeatherAdvice = () => {
    if (weather.loading) return 'Loading weather...';
    if (weather.error) return 'Weather data unavailable';

    const temp = weather.temperature;
    const condition = weather.description.toLowerCase();

    if (condition === 'thunderstorm') return 'Not suitable for outdoor activities';
    if (condition === 'rain') return 'Consider rescheduling outdoor activities';
    if (temp < 10) return 'Dress warmly for outdoor tasks';
    if (temp > 30) return 'Stay hydrated during outdoor activities';
    return 'Good conditions for outdoor tasks';
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center justify-between p-4 bg-white rounded-lg shadow ${
            task.completed ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleTask(task.id))}
              className="focus:outline-none"
            >
              {task.completed ? (
                <CheckCircle className="text-green-500" size={24} />
              ) : (
                <Circle className="text-gray-400" size={24} />
              )}
            </button>
            <div>
              <p
                className={`text-lg ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{' '}
                  Priority
                </span>
                {task.isOutdoor && (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      {getWeatherIcon()}
                      <span>{weather.temperature}°C</span>
                      <span className="text-sm text-gray-500">
                        ({weather.description})
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{getWeatherAdvice()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => dispatch(removeTask(task.id))}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full focus:outline-none"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
      )}
    </div>
  );
};

export default TaskList;