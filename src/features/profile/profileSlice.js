// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: '',
    image: '',
  },
  reducers: {
    setProfileName: (state, action) => {
      state.name = action.payload;
    },
    setProfileImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setProfileName, setProfileImage } = profileSlice.actions;

export default profileSlice.reducer;
