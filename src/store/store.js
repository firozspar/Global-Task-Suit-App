import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    // later we can Add other reducers here
  },
});

export default store;
