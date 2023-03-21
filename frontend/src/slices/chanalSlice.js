import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  channels: [],
  channelId: 1,
  // newChannels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
      // return { ...state, channels: payload };
    },
    setChannelId(state, { payload }) {
      state.channelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChannel(state, { payload }) {
      const update = [...state.channels.filter((channel) => channel.id !== payload.id)];
      state.channels = update;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;

