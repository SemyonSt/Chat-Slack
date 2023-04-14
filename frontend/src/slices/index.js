import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelsSlice.js';
import messageReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    channelReducer,
    messageReducer,
  },
});
