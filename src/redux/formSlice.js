import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {}
  },
  reducers: {
    saveFormData: (state, action) => {
      state.formData = action.payload;
    }
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
