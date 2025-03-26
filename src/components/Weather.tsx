import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';
import { fetchWeather } from '../store/slices/weatherSlice';
import type { RootState } from '../store';

const Weather: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, temperature, description, feelsLike, windSpeed, humidity, lastUpdated } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
    // Refresh weather data every 30 minutes
    const interval = setInterval(() => {
      dispatch(fetchWeather());
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="animate-pulse flex items-center gap-2 text-gray-400">
        <Cloud size={24} />
        <span>Loading weather...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 flex items-center gap-2">
        <CloudRain size={24} />
        <span>Failed to load weather</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sun size={24} className="text-yellow-500" />
          <span className="text-2xl font-semibold">{temperature}°C</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-700">{description}</span>
          <span className="text-sm text-gray-500">Feels like {feelsLike}°C</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Wind size={16} />
          <span>{windSpeed} m/s</span>
        </div>
        <div className="flex items-center gap-1">
          <Thermometer size={16} />
          <span>{humidity}% humidity</span>
        </div>
      </div>
      {lastUpdated && (
        <div className="mt-1 text-xs text-gray-400">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default Weather;