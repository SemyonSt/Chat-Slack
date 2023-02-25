import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
      // return { ...state, channels: payload };
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;

