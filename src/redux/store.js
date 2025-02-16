import { configureStore } from '@reduxjs/toolkit';
import gradeContentReducer from './slices/gradeContentSlice';
import usersReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
 const store = configureStore({
  reducer: {
    users: usersReducer,
    gradeContent: gradeContentReducer,
    auth: authReducer,
 
  },
});

export default store;