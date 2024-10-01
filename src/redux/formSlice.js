import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const saveFormDataAsync = createAsyncThunk(
  'form/saveFormDataAsync',
  async (formData, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => resolve(formData), 4000);
      });
    } catch (error) {
      return rejectWithValue('Failed to save form data');
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {},
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveFormDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveFormDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formData = action.payload;
      })
      .addCase(saveFormDataAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default formSlice.reducer;
