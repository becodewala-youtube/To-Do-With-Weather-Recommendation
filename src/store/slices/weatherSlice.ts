import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherData } from '../../types';

const OPENWEATHER_API_KEY = import.meta.env.VITE_API_KEY; 
// Note: In production, this should be in .env

// Function to get the user's current location
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Thunk action creator
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (_, { rejectWithValue }) => {
    try {
      const location = await getCurrentLocation();
      const lat = location.latitude;
      const lon = location.longitude;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform the data before returning
      return {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: Math.round(data.main.feels_like),
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch weather data');
    }
  }
);

// Function to handle location permission errors
const handleLocationError = (error) => {
  if (error.code === error.PERMISSION_DENIED) {
    console.error('Location permission denied');
  } else {
    console.error('Error getting location:', error);
  }
};

// Extended WeatherData interface with new fields
interface ExtendedWeatherData extends WeatherData {
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  lastUpdated: string | null;
}

const initialState: ExtendedWeatherData = {
  temperature: 0,
  description: '',
  humidity: 0,
  windSpeed: 0,
  feelsLike: 0,
  loading: false,
  error: null,
  lastUpdated: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.temperature = action.payload.temperature;
        state.description = action.payload.description;
        state.humidity = action.payload.humidity;
        state.windSpeed = action.payload.windSpeed;
        state.feelsLike = action.payload.feelsLike;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch weather data';
        handleLocationError(action.error);
      });
  },
});

export const { clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;