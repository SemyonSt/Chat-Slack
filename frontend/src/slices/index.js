import { configureStore } from '@reduxjs/toolkit';
import channelReduser from './chanalSlice.js';
import messageReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    channelReduser,
    messageReducer,
  },
});
