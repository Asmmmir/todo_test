import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TodoStatus } from '../todoSlice/todoSlice';


const API = 'https://example.com/api/todos';


interface CompletedTask {
  id: string;
  title: string;
  completed: TodoStatus;
}

export const fetchCompletedTasks = createAsyncThunk<CompletedTask[]>(
  'todos/fetchCompletedTasks',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error('Failed to fetch completed tasks');
      }

      const data = await response.json();
      const todos = data.todos || [];
      const result = todos.filter((todo : CompletedTask )=> todo.completed == 'Done')

      return result;
    } catch (error:any) {
      console.error('Error fetching completed tasks:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const completedTasksSlice = createSlice({
  name: 'completedTasks',
  initialState: {
    tasks: [] as CompletedTask[], 
    status: 'idle' as 'idle' | 'pending' | 'fulfilled' | 'rejected',
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.status = 'pending';
        
      })
      .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.tasks = action.payload
      })
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.status = 'rejected';
        console.error('Error fetching completed tasks:', action.payload);
      });
  },
});


export default completedTasksSlice.reducer;
