import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: false,
  },
  reducers: {
    setDark: (state, action) => { state.isDark = action.payload; },
  },
});

export const { setDark } = themeSlice.actions;
export default themeSlice.reducer;
