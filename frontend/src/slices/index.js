import { configureStore } from '@reduxjs/toolkit';
import channelReduser from './chanalSlice.js';


export default configureStore({
  reducer: {
    channelReduser,

  },
});
