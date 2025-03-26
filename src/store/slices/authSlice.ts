import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

const initialState: User = {
  id: '',
  username: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.id = Math.random().toString(36).substr(2, 9);
      state.username = action.payload.username;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout: (state) => {
      state.id = '';
      state.username = '';
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    restoreSession: (state) => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        state.id = user.id;
        state.username = user.username;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;