/* eslint-disable no-param-reassign */

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
      state.channelId = localStorage.getItem('userDo') ? payload.id : state.channelId;
      localStorage.removeItem('userDo');
    },
    removeChannel(state, { payload }) {
      const update = state.channels.filter((channel) => channel.id !== payload.id);
      state.channelId = state.channelId === payload.id ? 1 : state.channelId;
      state.channels = update;
    },
    renameChannel(state, { payload }) {
      const update = state.channels.map((i) => {
        if (i.id === payload.id) {
          i = payload;
          return i;
        }
        return i;
      });
      state.channels = update;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
