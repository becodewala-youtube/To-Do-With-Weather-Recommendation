export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  isOutdoor: boolean;
}

export interface User {
  id: string;
  username: string;
  isAuthenticated: boolean;
}

export interface WeatherData {
  temperature: number;
  description: string;
  loading: boolean;
  error: string | null;
}