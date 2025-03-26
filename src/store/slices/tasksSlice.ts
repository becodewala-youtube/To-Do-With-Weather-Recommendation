import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: JSON.parse(localStorage.getItem('tasks') || '[]').map((task: any) => ({
    ...task,
    isOutdoor: task.isOutdoor || false,
  })),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
  },
});

export const { addTask, removeTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;